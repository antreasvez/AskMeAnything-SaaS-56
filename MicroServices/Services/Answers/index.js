const express = require("express");
const app = express();

//middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post an answer
app.use("/postAnswer", require("./routes/postAnswer.js"));

// Get answers per QuestionID
app.use("/getAnswers", require("./routes/getAnswers.js"));


//Port
const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});