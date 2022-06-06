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
    idCard: {
      type: Number,
    },
    DataLastActivity: {
      type: String,
    },
    pos: {
      type: String,
    },
    Attachement: {
      type: String,
      // require: true,
    },
    due: {
      type: Date,
    },
    dueComplet: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
cardSchema.pre("save", function (next) {
  let card = this;
  sequencing
    .getSequenceNextValue("idCard")
    .then((counter) => {
      console.log("Counter", counter);
      if (!counter) {
        sequencing
          .insertCounter("idCard")
          .then((counter) => {
            card.idCard = counter;
            console.log(card);
            next();
          })
          .catch((error) => next(error));
      } else {
        card.idCard = counter;
        next();
      }
    })
    .catch((error) => next(error));
});

module.exports = mongoose.model("Card", cardSchema);
