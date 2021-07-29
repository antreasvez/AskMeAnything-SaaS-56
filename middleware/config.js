const session = require("express-session");
const pgSession = require("express-pg-session")(session);
const sessionPool = require('pg').Pool;


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
    }
};

module.exports = sessionConfig;