const mongoose = require("mongoose");

const membreSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membre", membreSchema);
