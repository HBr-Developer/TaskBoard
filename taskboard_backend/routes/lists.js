const express = require("express");
const router = express.Router();
const {
  createList,
  getAllList,
  listById,
  listDelete,
  listUpdate,
  createListInBoard,
  getListsFromBoard,
} = require("../controllers/listController");

router.get("/", getAllList);
router.post("/board/:boardId", getListsFromBoard);
router.get("/:id", listById);
router.post("/create", createList);
router.post("/:boardId/create", createListInBoard);
router.delete("/:id", listDelete);
router.patch("/:id", listUpdate);

module.exports = router;
