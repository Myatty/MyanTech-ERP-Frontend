const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require("../../config/db");

const router = express.Router();


const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: "$2a$12$HeWCu1FCZxL.eYuX0zOx/emvhfW/0nV3xNwXkagAia3bJXfmjjAJG"
};

const authenticateUser = (email, password, res) => {
    if (email !== mockUser.email) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    bcrypt.compare(password, mockUser.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: mockUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ message: 'Login successful' });
    });
};

router.post(
    '/login',
    body('email').isEmail(),
    body('password').notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        console.log(email, password)

        authenticateUser(email, password, res);

        // pool.query('SELECT * FROM User WHERE email = ?', [email], (error, results) => {
        //     if (error) {
        //         return res.status(500).json({ error: error.message });
        //     }

        //     if (results.length === 0) {
        //         return res.status(401).json({ message: 'Invalid email or password' });
        //     }

        //     const user = results[0];

        //     bcrypt.compare(password, user.password, (err, isMatch) => {
        //         if (err) {
        //             return res.status(500).json({ error: err.message });
        //         }

        //         if (!isMatch) {
        //             return res.status(401).json({ message: 'Invalid email or password' });
        //         }

        //         const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //         res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        //         res.json({ message: 'Login successful' });
        //     });
        // });
    }
);

module.exports = router;