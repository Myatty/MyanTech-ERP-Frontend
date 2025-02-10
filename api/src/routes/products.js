const express = require("express");
const {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getAllBrands,
} = require("../controllers/productController");
const router = express.Router();

// Product search route
router.get("/search", searchProducts);
router.get("/brand-names", getAllBrands); // only brandNames

router.get("/", getAllProducts);  // GET /api/products?limit=100&offset=0
router.get("/:id", getProduct); 
router.post("/", addProduct); 
router.put("/:id", updateProduct); 
router.delete("/:id", deleteProduct); 

module.exports = router;
