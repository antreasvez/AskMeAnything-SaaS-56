const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/", (req,res) => {

    if (!req.session.loggedIn){
        return res.redirect("/signin");
    }

    return res.render("questionscreate.ejs");
});

router.post("/", async (req, res) => {
    try {
        const {title, information, keywords} = req.body;

        
        var tags = keywords.replace(/\s/g, '')

        tags = tags.split(",");

        var user_id = req.session.user.id;

        var newquestion = await pool.query(
            "INSERT INTO questions(user_id, title, question_text, keywords) VALUES ($1, $2, $3, $4) RETURNING *;",
            [user_id, title, information, tags]
        )
        
        return res.redirect("/");
        

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;