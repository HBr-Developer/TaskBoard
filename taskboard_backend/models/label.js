const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    color: {
      type: String
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Label", labelSchema);
