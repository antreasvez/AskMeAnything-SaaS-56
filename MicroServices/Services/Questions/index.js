const express = require("express");
const app = express();

//middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post a Question
app.use("/postQuestion", require("./routes/postQuestion.js"));

// // Get all questions
app.use("/getQuestions", require("./routes/getQuestions.js"));


//Port
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});