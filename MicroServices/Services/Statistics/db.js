const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "123454",
  host: "localhost",
  port: 5432,
  database: "micro_stats_questions"
});

module.exports = pool;