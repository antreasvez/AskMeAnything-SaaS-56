const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/", (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/login");
    }

    return res.render("askquestion.ejs");
});

router.post("/", async (req, res) => {
    try {
        const {question, information, keywords} = req.body;

        var tags = keywords.replace(/\s/g, '')
        tags = tags.split(",");

        var uid = req.session.user.id;

        var askQ = await pool.query(
            "INSERT INTO questions(uid, question, information, tags) VALUES ($1, $2, $3, $4) RETURNING *;",
            [uid, question, information, tags]
        )
        
        return res.redirect("/");
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;