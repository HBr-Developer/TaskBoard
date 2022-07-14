const express = require("express");
const router = express.Router();
const {
  createLabel,updateLabel,getLabelsOfBoard
} = require("../controllers/LabelController");

// const { protect } = require('../middleware/authMiddleware');
router.post("/", createLabel);
router.patch("/:id", updateLabel);
router.get("/:board", getLabelsOfBoard);

module.exports = router;
