const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.set("views","views")


app.use("/", require("./routes/users"));
app.use("/", require("./routes/login"));
app.listen(5000, () => {
  console.log("Server is live on 5000");
});