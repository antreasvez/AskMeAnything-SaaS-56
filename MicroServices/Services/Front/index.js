const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
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
    password: "68709900",
    host: "localhost",
    port: 5432,
    database: "micro_front",
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


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server has started at ${port}`);
});




app.get("/", (req,res) => {
  return res.render('index.ejs');
});
app.get("/signup", (req,res) => {
  return res.render('signup.ejs');
});
app.get("/login", (req,res) => {
  return res.render('login.ejs');
});


app.use("/signup", require("./routes/signup.js"));

app.use("/login", require("./routes/login.js"));

app.use("/logout", require("./routes/logout.js"));

app.use("/askquestion", require("./routes/askquestion.js"));

app.use("/questions", require("./routes/listquestions.js"));

app.use("/answerquestion", require("./routes/answerquestion.js"));

app.use("/questionsperkeyword", require("./routes/keywordscount.js"));

app.use("/questionsperperiod", require("./routes/periodcount.js"));

app.use("/myama", require("./routes/myama.js"));
