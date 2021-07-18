const express = require("express");
const router = express.Router();
const pool = require("../db.js");


// get all questions
router.get("/", async (req,res) => {
try{

  const allquestions = await pool.query(
      "SELECT * FROM questions;"
  );
  res.json(allquestions)
  
   } catch (e) {
    console.log(e.message);
    res.status(500).send("Server Error");
   }
});

//get a specific question
router.get("/perID", async (req,res) => {
  try{
    const { questionID } = req.body;
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