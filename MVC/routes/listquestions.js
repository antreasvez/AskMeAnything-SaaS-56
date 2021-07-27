const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/", async (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/login");
    }


    const allquestions = await pool.query(
        "SELECT qid, questions.uid, users.uid, question, information, tags, qTime, users.username FROM questions, users WHERE questions.uid = users.uid ;"
    );   

    //console.log(allquestions);

    return res.render("listquestions.ejs", {allquestions: allquestions.rows})
});


module.exports = router;