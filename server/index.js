const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");

//middleware

app.use(cors());
app.use(express.json());

app.use("/Users", require("./routes/users"));

app.listen(5000, () => {
  console.log("Server is live on 5000");
});