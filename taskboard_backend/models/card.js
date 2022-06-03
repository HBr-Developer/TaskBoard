const mongoose = require("mongoose");
const sequencing = require("../config/sequencing");

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
    id_card:{
      type:Number
    }
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
cardSchema.pre("save", function (next) {
  let  card = this;
  sequencing.getSequenceNextValue("id_card").
  then(counter => {
      console.log("Counter", counter);
      if(!counter) {
          sequencing.insertCounter("id_card")
          .then(counter => {
            card.id_card = counter;
              console.log(card)
              next();
          })
          .catch(error => next(error))
      } else {
        card.id_card = counter;
          next();
      }
  })
  .catch(error => next(error))
});

module.exports = mongoose.model("Card", cardSchema);
