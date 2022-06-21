const express = require("express");
const router = express.Router();
const {
  createCard,
  cardById,
  getAllCards,
  cardDelete,
  cardUpdate,
} = require("../controllers/cardController");

const { protect } = require('../middleware/authMiddleware');

// router.post("/create", createCard);
router.post("/create", protect, createCard);
router.get("/", getAllCards);
router.get("/:id", cardById);
router.delete("/:id", cardDelete);
router.patch("/:id", cardUpdate);

module.exports = router;
