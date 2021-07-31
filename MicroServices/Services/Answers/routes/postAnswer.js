const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/:id", async (req,res) => {
    try{
      const questionID = req.params.id;
      const answers = await pool.query(
          "SELECT answerID, userID, email, questionID, answer_text, to_char(answered_on, 'HH12:MI:SS TZ') as answered_on FROM answers where questionID=$1;",
          [questionID]
      );
      res.json(answers)
      
       } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
       }
    });

router.post("/:id", async (req, res) => {
  try {
      const {userID, email, answer_text} = req.body;

      const questionID = req.params.id;

      var answer = await pool.query(
          "INSERT INTO answers(userID, email, questionID, answer_text) VALUES ($1, $2, $3, $4) RETURNING *;",
          [userID, email, questionID, answer_text]
      )

      res.json({Message: "Your answer was submitted"})
      
  } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
  }
});

module.exports = router;