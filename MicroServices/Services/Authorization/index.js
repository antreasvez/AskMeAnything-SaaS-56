const express = require("express");
const app = express();

require('dotenv').config();


//middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //Signup
app.use("/signup", require("./routes/signup.js"));

// //Signin
app.use("/login", require("./routes/login.js"));

// //Signout
app.use("/logout", require("./routes/logout.js"));

//Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});