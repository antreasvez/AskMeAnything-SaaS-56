const express = require("express");
const app = express.Router();
const cors = require("cors");
const pool = require("../db");
const bcrypt = require("bcryptjs");

app.use(express.json());

// Create New User
app.post("/Users", async(req,res)=>{
    try{
      console.log(req.body);
      const {username,password,email} = req.body;
      const Salt = await bcrypt.genSalt();
      const HashedPass = await Promise.all([bcrypt.hash(password, Salt)]);
      const newUser = await pool.query(
        "INSERT INTO users (username,password,email) VALUES ($1,$2,$3)",
        [username, HashedPass[0],email]
      );
  
    }
    catch(err){
      console.error(err.message);
      console.log("greetins");
    }
});

//get a user

app.get("/Users/:id",async (req,res)=>{
    try{
      const { id } = req.params;
      const user = await pool.query("SELECT username,email FROM users WHERE uid = $1",[
        id
      ]);
      console.log(user.rows);
    }
    catch(err){
      console.error(err.message);
    }
});

module.exports = app;


