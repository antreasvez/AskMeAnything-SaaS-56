const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.post("/", async (req, res) => {
  try {
      const {userID, questionID, answer_text} = req.body;

      var answer = await pool.query(
          "INSERT INTO answers(userID, questionID, answer_text) VALUES ($1, $2, $3) RETURNING *;",
          [userID, questionID, answer_text]
      )

      res.json({Message: "Your answer was submitted"})
      
  } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
  }
});

module.exports = router;