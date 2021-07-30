const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/", async (req,res) => {

    const day7 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= NOW() - interval '24 hours';"
    )
    const day6 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= CURRENT_DATE - integer '2' and qtime <= CURRENT_DATE - integer '1';"
    )
    const day5 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= CURRENT_DATE - integer '3' and qtime <= CURRENT_DATE - integer '2';"
    )
    const day4 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= CURRENT_DATE - integer '4' and qtime <= CURRENT_DATE - integer '3';"
    )
    const day3 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= CURRENT_DATE - integer '5' and qtime <= CURRENT_DATE - integer '4';"
    )
    const day2 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= CURRENT_DATE - integer '6' and qtime <= CURRENT_DATE - integer '5';"
    )
    const day1 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= CURRENT_DATE - integer '7' and qtime <= CURRENT_DATE - integer '6';"
    )

    return res.render("periodcount.ejs", {day1: day1.rows, day2: day2.rows, day3: day3.rows, day4: day4.rows, day5: day5.rows, day6: day6.rows, day7: day7.rows})

});

module.exports = router;