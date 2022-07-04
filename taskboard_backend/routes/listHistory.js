const express = require("express");
const router = express.Router();
const {
  createHistory,
  getHistory
} = require("../controllers/listHistoryController");

router.post("/", createHistory);
router.get("/:boardId", getHistory);
module.exports = router;