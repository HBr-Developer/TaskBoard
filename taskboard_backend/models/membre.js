const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

// const Joi = require("joi");

const membreSchema = new mongoose.Schema(
  {
    _id:{
      type:Number,
    },
    username: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },
   },
  { _id: false },
 
  { timestamps: true }
);


 membreSchema.plugin(AutoIncrement);
module.exports = mongoose.model("Membre", membreSchema);
