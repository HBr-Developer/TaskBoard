const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const membreSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: Number,
    // },
      firstName:{
          type: String,
          require: true
      },
      lastName:{
          type: String,
          require: true
      },
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
