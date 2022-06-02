const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    closed: {
      type: Boolean,
    },
    pos: {
      type: String,
      // require: true,
    },
    subscribed: {
      type: Boolean,
    },
    board_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
