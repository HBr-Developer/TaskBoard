const express = require("express");
const router = express.Router();
const {
  getAllMembers,
  registerMember,
  loginMember,
  getMe,
  getMembersOfBoard
} = require("../controllers/memberController");

const { protect } = require('../middleware/authMiddleware');

router.post("/", registerMember);
router.post("/login", loginMember);
router.get("/me", protect, getMe);
router.get("/", getAllMembers);
router.get("/:boardId", getMembersOfBoard);

module.exports = router;
