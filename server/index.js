const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");

//middleware

app.use(cors());
app.use(express.json());

//Routes

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
  }
});

// Get a user

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


//User login

app.post('/Users/login',async (req,res)=> {
  const user = await pool.query("SELECT * FROM users WHERE username = $1",[
    req.body.username
  ]);
  console.log(req.body)
  try{
    if (user.rows[0].username == null){

      return res.send('User not found')
    }
    if(await bcrypt.compare(req.body.password,user.rows[0].password)){
      console.log('User Logged In')
      res.send('Success')
    }
    else{
      res.send('Wrong Password')
    }
  }
  catch(err){
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server is live on 5000");
});