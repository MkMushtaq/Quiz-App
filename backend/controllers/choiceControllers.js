const aysncHandler = require("express-async-handler");
const Responses = require("../models/responsesModel");
const getChoices = aysncHandler(async (req, res) => {
  res.status(200).json({ message: "Get responses" });
});

const postChoices = aysncHandler(async (req, res) => {
  // console.log(req.body);
  const responses = req.body;
  const temp = responses.questions;
  const finalQuestions = [];
  const finalChoices = [];
  const finalNums = [];
  for (let i = 0; i < 10; i++) {
    finalNums.push(temp[i].num);
    finalQuestions.push(temp[i].question);
    finalChoices.push(temp[i].active);
  }
  console.log(finalNums);
  console.log(finalQuestions);
  console.log(finalChoices);
  // console.log({
  //   num: responses.num,
  //   questions: responses.questions,
  //   choices: responses.choices,
  //   timeTaken: null,
  // });
  const response = await Responses.create({
    num: finalNums,
    questions: finalQuestions,
    choices: finalChoices,
    // timeTaken: null,
  });
  console.log(res);
  res.status(200).json("Inserted into DB");
});

const updateChoices = aysncHandler(async (req, res) => {
  res.status(200).json({ message: `Updated choice ${req.params.id}` });
});

const deleteChoices = aysncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted choice ${req.params.id}` });
});

module.exports = {
  getChoices,
  postChoices,
  updateChoices,
  deleteChoices,
};
