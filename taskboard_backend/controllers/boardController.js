const Board = require("../models/board");
const Card = require("../models/card");
const List = require("../models/list");

exports.createBoard = async (req, res) => {
  const board = new Board(req.body);
  try {
    const newBoard = await board.save();
    res.json(newBoard);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const allBoards = await Board.find().populate({
      path: "lists",
      populate: {
        path: "cards",
        model: "Card",
      },
    });
    res.json(allBoards);
  } catch (err) {
    console.log(err.message);
  }
};

exports.boardById = async (req, res) => {
  try {
    let newBoard = await Board.findById(req.params.id, 'name lists').populate({
      path: 'lists',
      select: 'name cards',
      populate: {
        path: 'cards',
        select: 'name descData'
      }
    });
    res.json(newBoard);
  } catch (err) {
    console.log(err);
  }
};

exports.boardDelete = async (req, res) => {
  try {
    const boardDeleteRes = await Board.findByIdAndDelete(req.params.id);
    console.log(boardDeleteRes);
    boardDeleteRes.lists.map(async (list) => {
      await List.findByIdAndDelete(list);
      await Card.deleteMany({ list_id: list._id });
    });
    res.json(`Board ${boardDeleteRes.name} deleted successfully`);
  } catch (err) {
    console.log(err);
  }
};

exports.boardUpdate = async (req, res) => {
  try {
    await Board.findByIdAndUpdate(req.params.id, req.body);
    res.send("Board updated succesfully");
  } catch (err) {
    console.log(err);
  }
};

exports.listsOfBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId, 'name descData lists').populate({
      path: 'lists',
      select: 'name cards',
      populate: {
        path: 'cards',
        select: 'name descData'
      }
    })
    res.json(board);
  } catch(err) {
    console.log(err);
  }
}

// exports.getAllLists = async (req, res) => {
//   Board.find({ name: req.params.name })
//     .populate("lists", "_id name closed subscribed")
//     .exec()
//     .then((docs) => {
//       res.status(200).json({
//         count: docs.length,
//         boards: docs.map((doc) => {
//           return {
//             _id: doc._id,
//             name: doc.name,
//             lists: doc.lists,
//           };
//         }),
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
