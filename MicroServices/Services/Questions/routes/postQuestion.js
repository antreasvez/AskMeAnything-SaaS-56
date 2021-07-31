const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.post("/", async (req, res) => {
  try {
      const {userID, title, email, question_text, keywords} = req.body;
      var outkeys = keywords.replace(/\s/g, '')
      outkeys = outkeys.split(",");
      var newquestion = await pool.query(
          "INSERT INTO questions(userID, email, title, question_text, keywords) VALUES ($1, $2, $3, $4) RETURNING *;",
          [userID, email, title, question_text, outkeys]
      )

      res.json({Message: "Question was successfully posted"})
      

  } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
  }
});

module.exports = router;