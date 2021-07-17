const express = require("express");
const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.length === 0 || password.length === 0){
        return res.status(400).json({Message: "Fill all fields!"})
    }

    const checkuseremail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkuseremail.rows.length === 0){ //wrong email
      return res.status(401).json({Message: "Wrong Email"})
    }

    const checkpassword = await bcrypt.compare(password, checkuseremail.rows[0].password);
    if (!checkpassword){
      return res.status(401).json({Message: "Wrong Password"});
    }
    
    //creating token
    const payload = {
      user: checkuseremail.rows[0].userID,
      email: checkuseremail.rows[0].email
    }
    token = jwt.sign(payload, process.env.jwtSecret, {expiresIn: 3600});
    res.json({token});


  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;