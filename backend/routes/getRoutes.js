const express = require("express");
const {
  getChoices,
  postChoices,
  updateChoices,
  deleteChoices,
} = require("../controllers/choiceControllers");

const router = express.Router();

router.get("/", getChoices);

router.post("/", postChoices);

router.put("/:id", updateChoices);

router.delete("/:id", deleteChoices);
module.exports = router;
