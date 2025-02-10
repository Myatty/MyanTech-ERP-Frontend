const pool = require("../../config/db");

// Get all customers with pagination
const getAllCustomers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const offset = parseInt(req.query.offset) || 0;

        const [customers] = await pool.query("SELECT * FROM Customers ORDER BY name ASC LIMIT ? OFFSET ?", [limit, offset]);

        res.json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};
// Get single customer by name
const getCustomerByName = async (req, res) => {
    try {
        const searchCustomer = req.query.name;
        const [customer] = await pool.query("SELECT * FROM Customers WHERE name = ?", [searchCustomer]);
        if (customer.length === 0) return res.status(404).json({ error: "Customer not found" });
        res.json(customer[0]);
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// Create new customer
const createCustomer = async (req, res) => {
    try {
        const { name, contact_number1, contact_number2, email, address, township, region } = req.body;
        const [result] = await pool.query(
            "INSERT INTO Customers (name, contact_number1, contact_number2, email, address, township, region) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, contact_number1, contact_number2, email, address, township, region]
        );
        res.json({ message: "Customer added", customer_id: result.insertId });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ error: "Database insert failed" });
    }
};

// Update customer
const updateCustomer = async (req, res) => {
    try {
        const { customer_id, name, contact_number1, contact_number2, email, address, township, region } = req.body;
        const [result] = await pool.query(
            "UPDATE Customers SET name = ?, contact_number1 = ?, contact_number2 = ?, email = ?, address = ?, township = ?, region = ? WHERE customer_id = ?",
            [name, contact_number1, contact_number2, email, address, township, region, customer_id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Customer not found" });
        res.json({ message: "Customer updated" });
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ error: "Database update failed" });
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    try {
        const { customer_id } = req.body;
        const [result] = await pool.query("DELETE FROM Customers WHERE customer_id = ?", [customer_id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Customer not found" });
        res.json({ message: "Customer deleted" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: "Database delete failed" });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerByName,
    createCustomer,
    updateCustomer,
    deleteCustomer
};