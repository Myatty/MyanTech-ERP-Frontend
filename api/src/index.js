require('dotenv').config({ path: '../.env' });
const express = require('express');
const pool = require('../config/db');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "MyanTech ERP API is running!" });
});

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});