const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/", async (req,res) => {

    // if (!req.session.isLoggedIn){
    //     return res.redirect("/login");
    // }

    const allquestions = await pool.query(
        "SELECT qid, questions.uid, users.uid, question, information, tags, to_char(qtime, 'YYYY-MM-DD HH24:MI:SS TZ') as ftime,  users.username FROM questions, users WHERE questions.uid = users.uid ;"
    );   

    const count = await pool.query(
        "SELECT COUNT(*) FROM questions;"
    );

    // const answers = await pool.query(
    //     "SELECT"
    // )



    return res.render("listquestions.ejs", {allquestions: allquestions.rows, cq: count.rows[0].count})
});


module.exports = router;