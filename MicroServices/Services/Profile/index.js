const express = require("express");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Dashboard
app.use("/dashboard", require('./routes/profile.js'))

//Create Question
app.use("/createquestion", require("./routes/questionscreate.js"));

//Create Answer
app.use("/answerquestion", require("./routes/questionsanswer.js"));

//Port
const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Dashboard Service has started at port ${port}`);
});