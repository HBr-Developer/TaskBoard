const express = require("express");
const router = express.Router();
const { createLabel, getLabelOfCard, updateLabel } = require("../controllers/labelController");

router.post("/", createLabel);
router.get("/:cardId", getLabelOfCard);
router.patch("/:cardId", updateLabel);

module.exports = router;
