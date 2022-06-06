const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const membreSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: Number,
    // },
    username: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },
   
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
    },
  ],
  },
  // { _id: false },

  { timestamps: true }
);

// membreSchema.plugin(AutoIncrement);
module.exports = mongoose.model("Membre", membreSchema);
