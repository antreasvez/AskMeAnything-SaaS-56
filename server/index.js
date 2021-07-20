const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
//const sessionConfig = require("./middleware/config");
const pgSession = require("express-pg-session")(session);
const flash = require("connect-flash");
require('dotenv').config();
const sessionPool = require('pg').Pool;

//middleware
app.use(cors());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.set("views","views")

//static
app.use(express.static("static"));


const sessionDBaccess = new sessionPool({
  user: "postgres",
  password: "123454",
  host: "localhost",
  port: 5432,
  database: "askmeanything"
});


  const sessionConfig = {
    store: new pgSession({
        pool: sessionDBaccess,
        tableName: 'sessions'
    }),
    name: 'SID',
    expire: 24 * 60 * 60 * 1000,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        aameSite: true,
        secure: false // ENABLE ONLY ON HTTPS
    }};

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
  return res.render('index.ejs');
});
app.get("/signup", (req,res) => {
  return res.render('signup.ejs');
});
app.get("/login", (req,res) => {
  return res.render('login.ejs');
});
// app.get("/", (req,res) => {
//   return res.render('home.ejs');
// });
app.use("/signup", require("./routes/signup.js"));

app.use("/login", require("./routes/login.js"));

app.use("/logout", require("./routes/logout.js"));

app.use("/askquestion", require("./routes/askquestion.js"));

// app.get("/panigiraki", (req,res) => {
//   return res.render('panigiraki.ejs');
// });

// app.get("/spiti", (req,res) => {
//   return res.render('spiti.ejs');
// });

