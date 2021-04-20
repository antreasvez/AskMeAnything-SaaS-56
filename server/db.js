const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "123454",
  host: "localhost",
  port: 5432,
  database: "askmeanything"
});

module.exports = pool;