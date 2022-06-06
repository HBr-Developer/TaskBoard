const mongoose = require("mongoose");
const sequencing = require("../config/sequencing");


const boardSchema = new mongoose.Schema(
  {
    idBoard:{
      type: Number,
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

    membres: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Membre",
          role: {
            type: String,
          }
      },
    ],
    // VisitMember:{
    //   type:String,
    // },
    // invitMember:{
    //   type:String,
    // },
    // ownertMember:{
    //   type:String,
    // }
  },
  { timestamps: true }
);

// boardSchema.pre("save", function (next) {
//     let board = this;
//     sequencing.getSequenceNextValue("idBoard").
//     then(counter => {
//         console.log("Counter", counter);
//         if(!counter) {
//             sequencing.insertCounter("idBoard")
//             .then(counter => {
//               board.idBoard = counter;
//                 console.log(board)
//                 next();
//             })
//             .catch(error => next(error))
//         } else {
//           board.idBoard = counter;
//             next();
//         }
//     })
//     .catch(error => next(error))
// });
module.exports = mongoose.model("Board", boardSchema);
