const express = require("express");
const router = express.Router();
const pool = require("./../db");
const bcrypt = require("bcryptjs");
require("dotenv").config();


router.post('/', (req,res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

module.exports = router;
