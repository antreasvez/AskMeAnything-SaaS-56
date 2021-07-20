const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/", async (req, res) => {
  try {
      var count = await pool.query(
          "select keyword, count(*) as count from (select unnest(keywords) from questions) as keyword group by keyword order by count(*) desc;"
      )
      res.json({count})
  } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
  }
});

module.exports = router;