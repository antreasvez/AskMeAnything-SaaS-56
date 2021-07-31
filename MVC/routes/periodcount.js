const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/", async (req,res) => {

    const day7 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= current_date - interval '24 hours';"
    )
    const day6 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= current_date - interval '48 hours' and qtime <= current_date - interval '24 hours';"
    )
    const day5 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= current_date - interval '72 hours' and qtime <= current_date - interval '48 hours';"
    )
    const day4 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= current_date - interval '96 hours' and qtime <= current_date - interval '72 hours';"
    )
    const day3 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= current_date - interval '120 hours' and qtime <= current_date - interval '96 hours';"
    )
    const day2 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= current_date - interval '144 hours' and qtime <= current_date - interval '120 hours';"
    )
    const day1 = await pool.query(
        "SELECT count(*) FROM questions WHERE qtime >= current_date - interval '168 hours' and qtime <= current_date - interval '144 hours';"
    )

    const lday7 = await pool.query(
        "SELECT EXTRACT(month FROM current_date) AS month, EXTRACT(day FROM current_date) AS day ;"
    )

    const lday6 = await pool.query(
        "SELECT EXTRACT(month FROM current_date-interval '24 hours') AS month, EXTRACT(day FROM current_date-interval '24 hours') AS day;"
    )

    const lday5 = await pool.query(
        "SELECT EXTRACT(month FROM current_date-interval '48 hours') AS month, EXTRACT(day FROM current_date-interval '48 hours') AS day;"
    )

    const lday4 = await pool.query(
        "SELECT EXTRACT(month FROM current_date-interval '72 hours') AS month, EXTRACT(day FROM current_date-interval '72 hours') AS day;"
    )

    const lday3 = await pool.query(
        "SELECT EXTRACT(month FROM current_date-interval '96 hours') AS month, EXTRACT(day FROM current_date-interval '96 hours') AS day;"
    )

    const lday2 = await pool.query(
        "SELECT EXTRACT(month FROM current_date-interval '120 hours') AS month, EXTRACT(day FROM current_date-interval '120 hours') AS day;"
    )

    const lday1 = await pool.query(
        "SELECT EXTRACT(month FROM current_date-interval '144 hours') AS month, EXTRACT(day FROM current_date-interval '144 hours') AS day;"
    )


    return res.render("periodcount.ejs", {day1: day1.rows, day2: day2.rows, day3: day3.rows, day4: day4.rows, day5: day5.rows, day6: day6.rows, day7: day7.rows, lday1: lday1.rows, lday2: lday2.rows, lday3: lday3.rows, lday4: lday4.rows, lday5: lday5.rows, lday6: lday6.rows, lday7: lday7.rows})

});

module.exports = router;