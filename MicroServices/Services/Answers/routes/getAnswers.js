const express = require("express");
const router = express.Router();
const pool = require("../db.js");



//get a specific question
router.get("/:id", async (req,res) => {
  try{
    const questionID = req.params.id;
    const answers = await pool.query(
        "SELECT * FROM answers where questionID=$1;",
        [questionID]
    );
    res.json(answers)
    
     } catch (e) {
      console.log(e.message);
      res.status(500).send("Server Error");
     }
  });
module.exports = router;