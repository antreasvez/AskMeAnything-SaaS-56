const express = require("express");
const pool = require("./../db");
const router = express.Router();
require('dotenv').config();

router.get("/", async (req,res) => {

    if (!req.session.isLoggedIn){
        console.log("You have to login to access this area!")
        return res.redirect("/login");
    }

    console.log("pls help");

    const totalQuestions = await pool.query(
        "SELECT COUNT(*) FROM questions WHERE uid = $1;",
        [req.session.user.id]
    )

    console.log(totalQuestions);

    const todayQuestions = await pool.query(
        "SELECT COUNT(*) FROM questions WHERE uid = $1 AND qtime >= NOW() - interval '24 hours';",
        [req.session.user.id]
    )

    // console.log(todayQuestions);

    ///console.log(todayQuestions);

    const totalAnswers = await pool.query(
        "SELECT COUNT(*) FROM answers WHERE uid = $1;",
        [req.session.user.id]
    )

        console.log('kala edw');

    const todayAnswers = await pool.query(
        "SELECT COUNT(*) FROM answers WHERE uid = $1 AND atime >= NOW() - interval '24 hours';",
        [req.session.user.id]
    )

    console.log(todayAnswers);

    // return res.render("myama.ejs", {questionscount: myquestions.rows[0].count, answerscount: myanswers.rows[0].count, questionscounttoday: myquestionstoday.rows[0].count, answerscounttoday: myanswerstoday.rows[0].count, successMessage: req.flash("successMessage"), errorMessage: req.flash("errorMessage")})

    // todayQ: todayQuestions.rows[0].count, todayA: todayAnswers.rows[0].count
    return res.render("myama.ejs", {totalQ: totalQuestions.rows[0].count, totalA: totalAnswers.rows[0].count, todayQ: todayQuestions.rows[0].count, todayA: todayAnswers.rows[0].count});
});

module.exports = router;