const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    action: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ListHistory", historySchema);