const express = require("express");
const app = express();
 
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get Questions per Day
app.use("/getQuestionsPerDay", require("./routes/getQuestionsPerDay.js"));
// Post question
app.use("/postQuestion", require("./routes/postQuestion.js"));
// Get Keyword Count
app.use("/getKeywordsCount", require("./routes/getKeywordsCount.js"));
// Port
const port = process.env.PORT || 5004;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});