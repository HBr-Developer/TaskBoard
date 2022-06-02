const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    descData: {
      type: String,
      require: true,
    },
    list_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    // list: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
    // descData: {
    //   type: String,
    // },
    // DataLastActivity: {
    //   type: String,
    // },
    // pos: {
    //   type: String,
    // },
    // Attachement: {
    //   type: String,
    //   require: true,
    // },
    // adresse: {
    //   type: String,
    //   require: true,
    // },
    // closed: {
    //   type: Boolean,
    // },
    // subscribed: {
    //   type: Boolean,
    // },
    // due: {
    //   type: Date,
    // },
    // dueComplet: {
    //   type: Boolean,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
