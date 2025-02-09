const express = require('express');
const {
    getAllOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    addProductToOrder,
    getYearlyBreakup
} = require("../controllers/orderController");

const router = express.Router();

router.get("/yearly", getYearlyBreakup)

router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/add", addProductToOrder);

module.exports = router;