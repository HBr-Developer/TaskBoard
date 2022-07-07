const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    color: {
      type: String,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Label", labelSchema);
