const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/", async (req,res) => {

    
    try {
        const tagcount = await pool.query (
            "SELECT tag, COUNT(*) AS count FROM (SELECT unnest(tags) FROM questions) as tag GROUP BY tag ORDER BY COUNT(*) DESC;"
        )

        return res.render("keywordscount.ejs", {tags: tagcount.rows});
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }  

    
});

module.exports = router;