const List = require("../models/list");
const Board = require("../models/board");
const Card = require("../models/card");

exports.createList = async (req, res) => {
  try {
    const list = new List(req.body);
    const saveRes = await list.save();
    res.json(saveRes);
  } catch (err) {
    console.log(err);
  }
};

exports.createListInBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId).populate("lists");
    //saving a new list
    const newList = await new List({ ...req.body, board_id: board._id }).save();
    //saving the newlist in the board
    await Board.findByIdAndUpdate(board._id, {
      ...board._doc,
      lists: [...board.lists, newList._id],
    });
    res.json(newList);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllList = async (req, res) => {
  try {
    const allLists = await List.find().populate("cards", "name descData cardPermissions");
    res.json(allLists);
  } catch (err) {
    console.log(err);
  }
};

exports.listById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate({
      path: 'cards',
      model: 'Card'
    });
    res.json(list);
  } catch (err) {
    console.log(err.message);
  }
};

exports.listDelete = async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.id);
    await Card.deleteMany({ list_id: req.params.id });
    const board = await Board.findById(deletedList.board_id);
    await Board.findByIdAndUpdate(board._id, {
      ...board._doc,
      lists: board.lists.filter((list) => !list.equals(deletedList._id)),
    });
    res.json(deletedList);
  } catch (err) {
    console.log(err);
  }
};

exports.listUpdate = async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedList);
  } catch (err) {
    console.log(err);
  }
};

exports.getListsFromBoard = async (req, res) => {
  try {
    const boardLists = await List.find({ board_id: req.params.boardId }, 'name cards').populate({
      path: 'cards',
      model: 'Card',
      match: {_id: req.body.cards}
    })
    res.json(boardLists);
  } catch (err) {
    console.log(err);
  }
}
