const express = require("express");
const router = express.Router();
const pool = require("./../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();


router.get("/", (req,res) => {
  if (req.session.isLoggedIn){
    return res.redirect("/");
  }
  return res.render("signup.ejs")
})

router.post("/", async (req, res) => {
  try {
    const { username, email, password1, password2 } = req.body;
    console.log(req.body)
    if (password1 !== password2){
      // req.flash("successMessage", "passwords dont match")
      return res.redirect("/signup")
    }

    const salt = await bcrypt.genSalt();
    const pwd = await Promise.all([bcrypt.hash(password1, salt)]);
    const newUser = await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *;",
      [username, pwd[0], email]
    );


    // req.flash("successMessage", "Successful Signup")
    return res.redirect("/login");


  } catch (err) {
    res.status(400).json({ Message: "User with this username/email already exists" });
  }
});

module.exports = router;

