const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.post("/", async (req, res) => {
  try {
      const {keywords} = req.body;
      var outkeys = keywords.replace(/\s/g, '')
      outkeys = outkeys.split(",");
      var newquestion = await pool.query(
          "INSERT INTO questions(keywords) VALUES ($1) RETURNING *;",
          [outkeys]
      )

      res.json({Message: "Question was successfully posted for statistics"})
      

  } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
  }
});

module.exports = router;