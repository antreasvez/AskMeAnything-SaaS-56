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
  return res.render("login.ejs")
})


router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    const checkusername = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (checkusername.rows.length === 0){ 
      console.log("user doesn't exist");
      return res.redirect("/login");
    }

    const checkpassword = await bcrypt.compare(password, checkusername.rows[0].password);
    if (!checkpassword){
      return res.status(401).json({Message: "User's username and password do not match"});
    }


    req.session.isLoggedIn = true;
    req.session.user = {
      id: checkusername.rows[0].user_id,
      username: username
    }
    

    return res.redirect("/");


  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;