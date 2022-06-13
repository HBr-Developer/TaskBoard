const mongoose = require("mongoose");


const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    descData: {
      type: String
    },
    closed: {
      type: Boolean,
    },
    pinned: {
      type: Boolean,
    },
    starred: {
      type: Boolean,
    },
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      }
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Board", boardSchema);
