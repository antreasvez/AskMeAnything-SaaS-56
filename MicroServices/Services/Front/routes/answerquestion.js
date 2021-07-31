const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/:id", async (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/login");
    }

    const qid = req.params.id;

    const question = await pool.query(
        "SELECT * FROM questions WHERE qid = $1;",
        [qid]
    );

    // const answers = await pool.query(
    //     "SELECT aid, answers.uid, atime as bronze, qid, answer, users.username AS monki FROM answers, users WHERE answers.uid = users.uid AND qid = $1 ORDER BY aid;",
    //     [qid]
    // );

    const answers2 = await pool.query(
        "SELECT aid, answers.uid, to_char(atime, 'YYYY-MM-DD HH24:MI:SS TZ') AS bronze, qid, answer, users.username AS monki FROM answers, users WHERE answers.uid = users.uid AND qid = $1 ORDER BY aid;",
        [qid]
    );


    return res.render("answerquestion.ejs", {qid: qid, question: question.rows[0], answers: answers2.rows})
});

router.post("/:id", async (req, res) => {
    try {
        const answerP = req.body.text;

        const qidP = req.params.id;

        const uidP = req.session.user.id;

        var answerQ = await pool.query(
            "INSERT INTO answers(uid, qid, answer) VALUES ($1,$2,$3);",
            [uidP, qidP, answerP]
        )

        
        return res.redirect(`/answerquestion/${qidP}`);
        //return res.redirect('/');

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;