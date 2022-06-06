const express = require("express");
const router = express.Router();
const {
  createBoard,
  boardById,
  getAllBoards,
  boardDelete,
  boardUpdate,
  listsOfBoard,
  AddMemberToBoard,
  deleteMembreInBoard
} = require("../controllers/boardController");

router.get("/", getAllBoards);
router.get("/:id", boardById);

router.post("/create", createBoard);
router.delete("/:id", boardDelete);
router.patch("/:id", boardUpdate);

router.get("/:boardId/lists", listsOfBoard)

router.post("/:membreId/board/:boardId", AddMemberToBoard);
router.patch("/:membreId/delete", deleteMembreInBoard);


module.exports = router;