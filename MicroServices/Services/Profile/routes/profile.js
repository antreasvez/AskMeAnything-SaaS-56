const express = require("express");
const router = express.Router();
const pool = require("../../db");


router.post("/", async (req,res) => {
    try {
        const {user_id} = req.body; 
        const myquestions = await pool.query(
            "SELECT COUNT(*) FROM questions WHERE userID = $1",
            [user_id]
        )

        const myanswers = await pool.query(
            "SELECT COUNT(*) FROM answers WHERE userID = $1",
            [user_id]
        )

        const myquestionstoday = await pool.query(
            "SELECT COUNT(*) FROM questions WHERE userID = $1 AND date_created >= NOW() - interval '24 hours'",
            [user_id]
        )

        const myanswerstoday = await pool.query(
            "SELECT COUNT(*) FROM answers WHERE userID = $1 AND answered_on >= NOW() - interval '24 hours'",
            [user_id]
        )

        return res.json({questionscount: myquestions.rows[0].count, answerscount: myanswers.rows[0].count, questionscounttoday: myquestionstoday.rows[0].count, answerscounttoday: myanswerstoday.rows[0].count})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
    
});

module.exports = router;