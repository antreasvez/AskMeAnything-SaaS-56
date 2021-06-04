const express = require("express");
const app = express();
const cors = require("cors");
const sessionConfig = require("./middleware/config");
const flash = require("connect-flash");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.set("views","views")

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
});


// app.use("/", require("./routes/users"));
// app.use("/", require("./routes/login"));
app.listen(4200, () => {
  console.log("Server is live on 4200 monkas");
});



// app.get('/', (req, res) =>{
//   res.send('<h1> hello moonk </h1>')
// });

app.get("/", (req,res) => {
  return res.render('home.ejs', {successMessage: req.flash("successMessage")});
});

app.use("/login", require("./routes/login.js"));


