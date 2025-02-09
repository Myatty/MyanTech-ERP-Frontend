const pool = require("../../config/db");
const bcryptjs = require('bcryptjs');


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query("SELECT * FROM users");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// get single  user
const getUserByName = async (req, res) => {
    try {
        const searchUser = req.query.name;
        const [user] = await pool.query("SELECT * FROM users WHERE name = ?", [searchUser]);
        if (user.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(user[0]);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// create new user  
const createUser = async (req, res) => {
    try {
        const { name, email, password, phone_number, role_name, dept_name } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password, phone_number, role_name, dept_name) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, hashedPassword, phone_number, role_name, dept_name]
        );
        res.json({ message: "User added", user_id: result.insertId });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Database insert failed" });
    }
};



module.exports = { 
    getAllUsers, 
    createUser, 
    getUserByName 
};