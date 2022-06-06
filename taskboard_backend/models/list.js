const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique:true,
    },

    closed: {
      type: Boolean,
    },
    pos: {
      type: String,
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
