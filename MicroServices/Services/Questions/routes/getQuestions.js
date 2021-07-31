const express = require("express");
const router = express.Router();
const pool = require("../db.js");


// get all questions
router.get("/", async (req,res) => {
try{

  const allquestions = await pool.query(
      "SELECT questionID,userID,email,title,question_text,keywords,to_char(date_created, 'HH12:MI:SS TZ') as date_created FROM questions;"
  );
  res.json(allquestions)
  
   } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
   }
});

//get a specific question
router.get("/:id", async (req,res) => {
  try{
    const questionID = req.params.id;
    const question = await pool.query(
        "SELECT * FROM questions where questionID=$1;",
        [questionID]
    );
    // console.log(questionID)
    res.json(question)
    
     } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
     }
  });
module.exports = router;