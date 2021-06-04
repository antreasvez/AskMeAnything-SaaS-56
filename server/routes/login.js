const express = require("express");
const router = express.Router();
const pool = require("./../db");
const bcrypt = require("bcryptjs");
require('dotenv').config();

//ROUTER

router.get("/", (req,res) => {
  if (req.session.isLoggedIn){
    return res.redirect("/");
  }
  return res.render("signin.ejs", {successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})
})


router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    const checkusername = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (checkusername.rows.length === 0){ //user does not exist
      // return res.status(401).json({Message: "User with that mail does not exist"})
      req.flash("errorMessage", "A user with this username doesn't exist");
      return res.redirect("/signin");
    }

    const checkpassword = await bcrypt.compare(password, checkusername.rows[0].password);
    if (!checkpassword){
      return res.status(401).json({Message: "User's username and password do not match"});
    }


    req.session.isLoggedIn = true;
    req.session.user = {
      id: checkusername.rows[0].user_id,
      email: email
    }
    req.flash("successMessage", "Successful Login")
    return res.redirect("/");


  } catch (err) {
    //res.status(401).json({ Message: "User with that mail does not exist" });
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;