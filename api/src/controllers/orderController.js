const pool = require("../../config/db");

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const [orders] = await pool.query("SELECT * FROM Orders");
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// Get a single order
const getOrder = async (req, res) => {
    try {
        const [order] = await pool.query("SELECT * FROM Orders WHERE order_id = ?", [req.params.id]);
        if (order.length === 0) return res.status(404).json({ error: "Order not found" });
        res.json(order[0]);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// Add new order
const addOrder = async (req, res) => {
    try {
        const { customer_id, order_date, status, total_amount } = req.body;
        const [result] = await pool.query(
            "INSERT INTO Orders (customer_id, order_date, status, total_amount) VALUES (?, ?, ?, ?)",
            [customer_id, order_date, status, total_amount]
        );
        res.json({ message: "Order added", order_id: result.insertId });
    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ error: "Database insert failed" });
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { customer_id, order_date, status, total_amount } = req.body;
        const [result] = await pool.query(
            "UPDATE Orders SET status=? WHERE order_id=?",
            [status, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Order not found" });
        res.json({ message: "Order updated" });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Database update failed" });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM Orders WHERE order_id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Order not found" });
        res.json({ message: "Order deleted" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Database delete failed" });
    }
};


// Add products to order
const addProductToOrder = async (req, res) => {
    console.log("went into order controller");
    let { customer_id, order_date, status, total_amount, products } = req.body;

    if (!order_date) {
        order_date = new Date();
    }

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Products array is required" });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [orderResult] = await connection.query(
            "INSERT INTO Orders (customer_id, order_date, status, total_amount) VALUES (?, ?, ?, ?)",
            [customer_id, order_date, status, total_amount]
        );

        const orderId = orderResult.insertId;

        for (const product of products) {
            const { product_id, quantity } = product;

            // Get the price of the product from the Products table
            const [productResult] = await connection.query(
                "SELECT price FROM products WHERE product_id = ?",
                [product_id]
            );

            if (productResult.length === 0) {
                await connection.rollback();
                return res.status(404).json({ error: `Product with id ${product_id} not found` });
            }

            const unit_price_at_time = productResult[0].price;

            await connection.query(
                "INSERT INTO OrderItems (order_id, product_id, quantity, unit_price_at_time) VALUES (?, ?, ?, ?)",
                [orderId, product_id, quantity, unit_price_at_time]
            );
        }

        await connection.commit();
        res.json({ message: "Order and products added", order_id: orderId });
    } catch (error) {
        await connection.rollback();
        console.error("Error adding products to order:", error);
        res.status(500).json({ error: "Database transaction failed" });
    } finally {
        connection.release();
    }
};

const getYearlyBreakup = async (req, res) => {
    try {
        const [yearlyBreakup] = await pool.query(`
            SELECT 
                YEAR(order_date) AS year,
                COUNT(*) AS total_orders,
                SUM(total_amount) AS total_amount
            FROM Orders
            GROUP BY YEAR(order_date)
            ORDER BY YEAR(order_date) DESC
        `);

        res.json(yearlyBreakup);
    } catch (error) {
        console.error("Error fetching yearly breakup data:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

module.exports = {
    getAllOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    addProductToOrder,
    getYearlyBreakup
};