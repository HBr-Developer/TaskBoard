const express = require("express");
const router = express.Router();
const {
  createCard,
  cardById,
  getAllCards,
  cardDelete,
  cardUpdate,
  createCardInList,
} = require("../controllers/cardController");

router.post("/create", createCard);
router.post("/:listId/create", createCardInList);
router.get("/", getAllCards);
router.get("/:id", cardById);
router.delete("/:id", cardDelete);
router.patch("/:id", cardUpdate);

module.exports = router;
