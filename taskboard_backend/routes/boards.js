const express = require("express");
const router = express.Router();
const {
  createBoard,
  boardById,
  getAllBoards,
  boardDelete,
  boardUpdate,
  listsOfBoard,
  assignPermissionToBoard,
  allBoards
  // deleteMemberInBoard
} = require("../controllers/boardController");
const { protect } = require('../middleware/authMiddleware');

router.get("/", protect, getAllBoards);
router.get("/:id", protect, boardById);
router.get("/boards", allBoards);

router.post("/create", protect, createBoard);
router.delete("/:id", protect, boardDelete);
router.patch("/:id", protect, boardUpdate);

router.get("/:boardId/lists", protect, listsOfBoard);

router.post("/permission/:boardId/:memberId", protect, assignPermissionToBoard);
// router.patch("/:memberId/delete", protect, deleteMemberInBoard);


module.exports = router;