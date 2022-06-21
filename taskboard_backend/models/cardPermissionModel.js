const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    role: {
      type: String,
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CardPermissions", memberSchema);