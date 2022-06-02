const express = require("express");
const router = express.Router();
const {
  createBoard,
  boardById,
  getAllBoards,
  boardDelete,
  boardUpdate,
  // getAllLists,
  listsOfBoard,
} = require("../controllers/boardController");

router.get("/", getAllBoards);
router.get("/:id", boardById);
// router.get("/:name/lists", getAllLists);
router.get("/:boardId/lists", listsOfBoard)
router.post("/create", createBoard);
router.delete("/:id", boardDelete);
router.patch("/:id", boardUpdate);

module.exports = router;
