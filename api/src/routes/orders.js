const express = require('express');
const {
    getAllOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    addProductToOrder,
    getYearlyBreakup,
    getMonthlyEarnings
} = require("../controllers/orderController");

const router = express.Router();

router.get("/yearly-breakup", getYearlyBreakup)
router.get("/monthly-earnings/:year", getMonthlyEarnings)

router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/add", addProductToOrder);

module.exports = router;