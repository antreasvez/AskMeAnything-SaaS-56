const express = require("express");
const app =  express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

// Create New User

app.post("/Users", async(req,res)=>{
    try{
      const {username,password,email} = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [
        email,username
      ]);

      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }

      const Salt = await bcrypt.genSalt();
      const HashedPassword = await Promise.all([bcrypt.hash(password, Salt)]);
      const newUser = await pool.query(
        "INSERT INTO users (username,password,email) VALUES ($1,$2,$3) RETURNING *",
        [username, HashedPassword[0],email]
      );
      const ID = newUser.rows[0].uid;
      const jwtToken = jwtGenerator(newUser.rows[0].uid);
      return res.json({ ID,jwtToken });
    }
    catch(err){
      console.error(err.message);
      res.status(500).send("Server error"); 
    }
});

//get a user

app.get("/Users/sela/:id",async (req,res)=>{
    try{
      const { id } = req.params;
      const user = await pool.query("SELECT username,password,email FROM users WHERE uid = $1",[
        id
      ]);
      if (user.rows.length == 0){
        return res.json("User not found");
      }
      data = user.rows;
      return res.json({data});
    }
    catch(err){
      console.error(err.message);
    }
});

module.exports = app;


