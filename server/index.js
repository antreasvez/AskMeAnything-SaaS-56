const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
const bcrypt = require("bcryptjs");

//middleware

app.use(cors());
app.use(express.json());

//Routes
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
  }
});


app.listen(5000, () => {
  console.log("Server is live on 5000");
});