const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    role: {
      type: String,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", memberSchema);