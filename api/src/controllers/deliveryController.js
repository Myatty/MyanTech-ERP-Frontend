const pool = require("../../config/db");

// Get all deliveries
const getAllDeliveries = async (req, res) => {
    try {
        const [deliveries] = await pool.query("SELECT * FROM Deliveries");
        res.json(deliveries);
    } catch (error) {
        console.error("Error fetching deliveries:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// Get single delivery by ID
const getDeliveryById = async (req, res) => {
    try {
        const { id } = req.params;
        const [delivery] = await pool.query("SELECT * FROM Deliveries WHERE delivery_id = ?", [id]);
        if (delivery.length === 0) return res.status(404).json({ error: "Delivery not found" });
        res.json(delivery[0]);
    } catch (error) {
        console.error("Error fetching delivery:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// Create new delivery
const createDelivery = async (req, res) => {
    try {
        const { driver_id, truck_id, departure_time } = req.body;
        const [result] = await pool.query(
            "INSERT INTO Deliveries (driver_id, truck_id, departure_time) VALUES (?, ?, ?)",
            [driver_id, truck_id, departure_time]
        );
        res.json({ message: "Delivery added", delivery_id: result.insertId });
    } catch (error) {
        console.error("Error adding delivery:", error);
        res.status(500).json({ error: "Database insert failed" });
    }
};

// Update delivery
const updateDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        const { driver_id, truck_id, departure_time, status } = req.body;
        const [result] = await pool.query(
            "UPDATE Deliveries SET driver_id=?, truck_id=?, departure_time=?, status=? WHERE delivery_id=?",
            [driver_id, truck_id, departure_time, status, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Delivery not found" });
        res.json({ message: "Delivery updated" });
    } catch (error) {
        console.error("Error updating delivery:", error);
        res.status(500).json({ error: "Database update failed" });
    }
};

// Delete delivery
const deleteDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("DELETE FROM Deliveries WHERE delivery_id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Delivery not found" });
        res.json({ message: "Delivery deleted" });
    } catch (error) {
        console.error("Error deleting delivery:", error);
        res.status(500).json({ error: "Database delete failed" });
    }
};

// Function to validate status
const isValidStatus = (status) => {
    const validStatuses = ['pending', 'delivering', 'delivered', 'cancelled'];
    return validStatuses.includes(status);
};

// Update delivery departure
const updateDeliveryDeparture = async (req, res) => {
    try {
        const { id } = req.params;
        const { departure_time, status } = req.body;

        if (!isValidStatus(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const [result] = await pool.query(
            "UPDATE Deliveries SET departure_time=?, status=? WHERE delivery_id=?",
            [departure_time, status, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Delivery not found" });
        res.json({ message: "Delivery updated" });
    } catch (error) {
        console.error("Error updating delivery:", error);
        res.status(500).json({ error: "Database update failed" });
    }
};

module.exports = {
    getAllDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery,
    updateDeliveryDeparture
};