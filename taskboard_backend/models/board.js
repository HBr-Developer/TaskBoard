const mongoose = require("mongoose");
// const autoIncrement = require('mongoose-sequence')(mongoose);

const sequencing = require("../config/sequencing");


const boardSchema = new mongoose.Schema(
  {
    idBoard:{
      type: Number,
      // autoIncrement:true,
   //   primaryKey:true,
      // require: true,
    },
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

    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre",
    },
  },
  // { _id: false },
  { timestamps: true }
);
//  boardSchema.plugin(autoIncrement);
boardSchema.pre("save", function (next) {
    let board = this;
    sequencing.getSequenceNextValue("idBoard").
    then(counter => {
        console.log("Counter", counter);
        if(!counter) {
            sequencing.insertCounter("idBoard")
            .then(counter => {
              board.idBoard = counter;
                console.log(board)
                next();
            })
            .catch(error => next(error))
        } else {
          board.idBoard = counter;
            next();
        }
    })
    .catch(error => next(error))
});
module.exports = mongoose.model("Board", boardSchema);
