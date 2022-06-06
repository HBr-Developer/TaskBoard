const Board = require("../models/board");
const Card = require("../models/card");
const List = require("../models/list");
const Membre = require("../models/membre");

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

exports.AddMemberToBoard = async (req, res) => {
  try {
    const membre = await Membre.findById(req.params.membreId);
    console.log("membre", membre);
    const board = await Board.findById(req.params.boardId);
    console.log("board", board);

    await Membre.findOneAndUpdate({_id: membre._id}, {boards: [...membre.boards, board._id]});
    await Board.findOneAndUpdate({_id: board._id}, {membres: [...board.membres, membre._id]});
    res.json(board);
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

exports.deleteMembreInBoard = async(req, res)=>{
  try
  { 
    const membre = await Membre.findById(req.params.membreId);
    await Board.updateMany({ '_id': membre.boards }, { $pull: { membres: membre._id } });
    
    
    res.json(membre);
    
    console.log("removed")
    
  }
  catch(err)
  {
    console.log(err.message);
  }
};