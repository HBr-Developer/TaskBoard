const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
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
    // idMemeberCreator: {
    //   type: String,
    //   ref: 'Membre',
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", boardSchema);
