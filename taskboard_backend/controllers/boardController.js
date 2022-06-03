const Board = require("../models/board");
const Card = require("../models/card");
const List = require("../models/list");

exports.createBoard = async (req, res) => {
  try {
    const board = new Board(req.body);
    console.log("board", board);
    await board.save();
    res.json({ created: "Created" });
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
    let newBoard = await Board.findById(req.params.id, "name lists").populate({
      path: "lists",
      select: "name cards",
      populate: {
        path: "cards",
        select: "name descData",
      },
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
    const board = await Board.findById(
      req.params.boardId,
      "name descData lists"
    ).populate({
      path: "lists",
      select: "name cards",
      populate: {
        path: "cards",
        select: "name descData",
      },
    });
    res.json(board);
  } catch (err) {
    console.log(err);
  }
};


