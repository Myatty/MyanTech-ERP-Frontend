const pool = require("../../config/db");

// Get all products with pagination
const getAllProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const offset = parseInt(req.query.offset) || 0;

        const [products] = await pool.query("SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?", [limit, offset]);

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// Get a single product
const getProduct = async (req, res) => {
    try {
        const [product] = await pool.query("SELECT * FROM products WHERE product_id = ?", [req.params.id]);
        if (product.length === 0) return res.status(404).json({ error: "Product not found" });
        res.json(product[0]);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// Add new product
const addProduct = async (req, res) => {
    try {
        const { name, category, brand, price, serial_number, stock_quantity, product_segment } = req.body;
        const [result] = await pool.query(
            "INSERT INTO products (name, category, brand, price, serial_number, stock_quantity, product_segment) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, category, brand, price, serial_number, stock_quantity, product_segment]
        );
        res.json({ message: "Product added", product_id: result.insertId });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Database insert failed" });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { name, category, brand, price, serial_number, stock_quantity, product_segment } = req.body;
        const [result] = await pool.query(
            "UPDATE products SET name=?, category=?, brand=?, price=?, serial_number=?, stock_quantity=?, product_segment=? WHERE product_id=?",
            [name, category, brand, price, serial_number, stock_quantity, product_segment, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product updated" });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Database update failed" });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM products WHERE product_id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Database delete failed" });
    }
};

// Search products
const searchProducts = async (req, res) => {
    try {
        const searchText = req.query.q;
        const [products] = await pool.query(
            "SELECT * FROM products WHERE name LIKE ? OR category LIKE ? OR brand LIKE ?",
            [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`]
        );
        res.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

const getAllBrands = async (req, res) => {
    try {
        const [brands] = await pool.query("SELECT DISTINCT brand FROM products ORDER BY brand ASC");
        res.json(brands);
    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};


module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getAllBrands,
};