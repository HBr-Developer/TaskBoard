const express = require("express");
const router = express.Router();
const {
  getAllMembers,
  registerMember,
  loginMember,
  getMe,
  getMembersOfBoard,
  updateMember
} = require("../controllers/memberController");

const { protect } = require('../middleware/authMiddleware');

router.post("/", registerMember);
router.post("/login", loginMember);
router.patch("/:memberId", updateMember);
router.get("/me", getMe);
router.get("/", getAllMembers);
router.get("/:boardId", getMembersOfBoard);

module.exports = router;
