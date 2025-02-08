const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

// get all products
router.get("/", async (req, res) => {
    try {
        const [products] = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

// get a single product
router.get("/:id", async (req, res) => {
    try {
        const [product] = await pool.query("SELECT * FROM products WHERE product_id = ?", [req.params.id]);
        if (product.length === 0) return res.status(404).json({ error: "Product not found" });
        res.json(product[0]);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

// add new product
router.post("/", async (req, res) => {
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
});

// update product
router.put("/:id", async (req, res) => {
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
});

// delete product
router.delete("/:id", async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM products WHERE product_id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Database delete failed" });
    }
});

module.exports = router;
