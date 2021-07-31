const express = require("express");
const router = express.Router();
const pool = require("./../db");
require('dotenv').config();

router.get("/:id", async (req,res) => {

    if (!req.session.isLoggedIn){
        return res.redirect("/login");
    }

    const qid = req.params.id;

        let datadict = []
        axios.get(`http://localhost:7000/getonequestion/${question_id}`)
        .then((response)=>{
            datadict.push({
                key: "question",
                value: response.data
            })
        })
        .then((response) => {
            axios.get(`http://localhost:7000/answerquestion/${question_id}`)
            .then((resp) => {
                datadict.push({
                    key: "answers",
                    value: resp.data
                })
            })
            .then((responsara) => {
                res.render("answerquestion.ejs", {qid: qid, question: datadict[0].value.question, answers: datadict[1].value.answers})
            })
        })

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