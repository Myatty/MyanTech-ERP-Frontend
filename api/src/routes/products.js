const express = require("express");
const {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get a single product
router.get("/:id", getProduct);

// Add new product
router.post("/", addProduct);

// Update product
router.put("/:id", updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

module.exports = router;