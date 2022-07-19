const express = require("express");
const router = express.Router();
const {
  createCard,
  cardById,
  getAllCards,
  cardDelete,
  cardUpdate,
  getCardsOfBoard
} = require("../controllers/cardController");

const { protect } = require('../middleware/authMiddleware');

// router.post("/create", createCard);
router.post("/create", protect, createCard);
router.get("/", getAllCards);
router.get("/:id", cardById);
router.get("/:board/:member", getCardsOfBoard);
router.delete("/:id", cardDelete);
router.patch("/:id", cardUpdate);

module.exports = router;
