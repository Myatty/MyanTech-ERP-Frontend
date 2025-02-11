const express = require('express');
const {
    getAllDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery,
    updateDeliveryStatus
} = require("../controllers/deliveryController");

const router = express.Router();


router.get("/", getAllDeliveries); // GET /api/deliveries?limit=100&offset=0
router.post("/", createDelivery);
router.get("/:id", getDeliveryById);
router.put("/update/:id", updateDeliveryStatus); //(Updating delivery status)
router.put("/:id", updateDelivery); // PUT /api/deliveries/1 (for updaing all the data in the delivery)
router.delete("/:id", deleteDelivery); // DELETE /api/deliveries/1

module.exports = router;