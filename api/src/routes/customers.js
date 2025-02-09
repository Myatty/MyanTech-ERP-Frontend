const express = require('express');
const {
    getAllCustomers,
    createCustomer,
    getCustomerByName,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

const router = express.Router();

router.get("/search", getCustomerByName);
router.get("/", getAllCustomers);
router.put("/", updateCustomer);
router.delete("/", deleteCustomer);

module.exports = router;