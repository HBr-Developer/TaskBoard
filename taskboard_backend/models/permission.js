const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    role: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", memberSchema);