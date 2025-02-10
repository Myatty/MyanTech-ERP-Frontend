const express = require('express');
const {
    getAllDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery
} = require("../controllers/deliveryController");

const router = express.Router();

router.get("/", getAllDeliveries);
router.get("/:id", getDeliveryById);
router.post("/", createDelivery);
router.put("/:id", updateDelivery);
router.delete("/:id", deleteDelivery);

module.exports = router;