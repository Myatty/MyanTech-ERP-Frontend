const express = require('express');
const {
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    addProductToOrder,
    getYearlyBreakup,
    getMonthlyEarnings
} = require("../controllers/orderController");

const router = express.Router();

router.get("/yearly-breakup", getYearlyBreakup)
router.get("/monthly-earnings/:year", getMonthlyEarnings)

router.get("/:id", getOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/", addProductToOrder);
router.get("/", getAllOrders); // GET /api/orders?limit=100&offset=0

module.exports = router;