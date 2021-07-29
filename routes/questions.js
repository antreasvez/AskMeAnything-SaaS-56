const express = require("express");
const app =  express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");

// Create New Question

app.post("/Questions", async(req,res)=>{
    try{
      const {description} = req.body;

      const newUser = await pool.query(
        "INSERT INTO users (description) VALUES ($1) RETURNING *",
        [description]
      );
      return res.json("Question Created");
    }
    catch(err){
      console.error(err.message);
      res.status(500).send("Server error"); 
    }
});


module.exports = app;