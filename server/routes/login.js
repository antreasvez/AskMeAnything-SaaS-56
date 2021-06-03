const express = require("express");
const app =  express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

app.get("/Users/login", (req,res) => {
  return res.render("signIn.ejs")
})
app.post('/Users/login', async (req,res)=> {
  
  try{
    const user = await pool.query("SELECT * FROM users WHERE username = $1",[
      req.body.username
    ]);
    console.log(user)
    if (user.rows.length === 0) {
      // return res.status(401).json(user);
      return res.status(401).json("Invalid Credential");
    }
    if(await bcrypt.compare(req.body.password,user.rows[0].password)){
      console.log('User Logged In')
      const ID =  user.rows[0].uid;
      const jwtToken = jwtGenerator(user.rows[0].uid);
      // return res.json({ ID,jwtToken });
      res.redirect('/Users/login')
    }
    else{
      return res.status(401).json("Invalid Credential");
    }
  }
  catch(err){
    console.error(err.message);
  }
});

module.exports = app;