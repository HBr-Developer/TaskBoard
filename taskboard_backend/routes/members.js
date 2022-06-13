const express = require("express");
const router = express.Router();
const {
  createMember,
  MemberUpdate,
  getAllMember,
  memberById,
  memberDelete,
  deleteMemberInBoard,
  AddMemberInBoard,
  registerMember,
  loginMember,
  getMe
} = require("../controllers/memberController");

const { protect } = require('../middleware/authMiddleware');

router.post("/", registerMember);
router.post("/login", loginMember);
router.get("/me", protect, getMe);

// router.post("/create", createMember);
// router.patch("/:id", MemberUpdate);
// router.get("/", getAllMember);
// router.get("/:id", memberById);
// router.delete("/:id", memberDelete);

module.exports = router;
