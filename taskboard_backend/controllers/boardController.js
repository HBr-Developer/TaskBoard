const Board = require("../models/board");
const Card = require("../models/card");
const List = require("../models/list");
const Member = require("../models/member");
const Permission = require("../models/permission");

exports.createBoard = async (req, res) => {
  try {
    // Create a new board
    const board = await Board({
      ...req.body
    });
    // Create a new permission
    const permission = await Permission.create({
      board: board._id,
      user: req.member.id,
      role: "admin"
    });
    // Retrieve the member logged in
    const member = await Member.findById(req.member.id, "permissions");
    // Adding the new Permission into the member logged in and the new board
    await Member.updateOne({ _id: req.member.id }, { permissions: [...member.permissions, permission._id] });
    board.permissions.push(permission._id);
    await board.save();
    res.json(board);
  } catch (err) {
    console.log(err);
  }
};

exports.assignPermissionToBoard = async (req, res) => {
  try {
    // Retrieve the member
    const member = await Member.findById(req.params.memberId);
    // Retrieve the current board
    const board = await Board.findById(req.params.boardId);
    // verify if permission exists
    const per = await Permission.find({ board: board._id, user: member._id });
    if (per.length === 0) {
      // New permission
      const permission = await Permission.create({
        board: board._id,
        user: member._id,
        role: "invited"
      });
      await Board.updateOne({ _id: board._id }, { permissions: [...board.permissions, permission] });
      res.json(permission);
    } else {
      res.json('Permission already exists');
    }
    
    // await permission.save();
    // Update user and board permissions
    // await Member.updateOne({_id: member._id}, {permissions: [...member.permissions, permission]});
    // const newBoard = await Board.updateOne({_id: board._id}, {permissions: [...member.permissions, permission]});
    // res.json(newBoard);
    
    // const member = await Member.findById(req.params.memberId);
    // console.log("member", member);
    // const board = await Board.findById(req.params.boardId);
    // console.log("board", board);
    //
    // await Member.findOneAndUpdate({_id: member._id}, {boards: [...member.boards, board._id]});
    // await Board.findOneAndUpdate({_id: board._id}, {members: [...board.members, member._id]});
    // res.json(board);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const permissions = await Permission.find({ user: req.member.id });
    // res.json(permissions);
    const permissionBoards = permissions.map((per) => per.board);
    const filter = {
      _id: permissionBoards,
      active: true
    }
    const allBoards = await Board.find(req.member.role.toLowerCase() === 'admin' ? { active: true } : filter, 'name descData lists permissions createdAt updatedAt')
      .populate({
        path: "lists",
        model: "List",
        match: { active: true },
        populate: {
          path: "cards",
          model: "Card",
          select: "name descData dueDate label",
          populate: {
            path: 'label',
            model: 'Label',
            select: 'title color'
          }
        },
      }).populate({
        path: 'permissions',
        select: 'user role',
        populate: {
          path: 'user',
          model: 'Member',
          select: 'name email'
        }
      }).exec();
    res.json(allBoards);
  } catch (err) {
    console.log(err.message);
  }
};

exports.boardById = async (req, res) => {
  try {
    let newBoard = await Board.findById(req.params.id, 'name descData lists permissions createdAt updatedAt').populate({
      path: "lists",
      match: { active: true },
      populate: {
        path: "cards",
        model: "Card",
        select: "name descData createdAt dueDate deliveryDate",
        populate: [
          {
            path: 'cardPermissions',
            model: 'CardPermissions',
            select: "user role",
            populate: {
              path: "user",
              select: "name email color"
            }
          },
          {
            path: 'label',
            model: 'Label',
            select: 'title color'
          }
        ]
      },
    }).populate({
      path: 'permissions',
      select: 'user role',
      populate: {
        path: 'user',
        model: 'Member',
        select: 'name email'
      }
    });
    res.json(newBoard);
  } catch (err) {
    console.log(err);
  }
};

exports.allBoards = async (req, res) => {
  try {
    const boards = Board.find({});
    res.send(boards);
  } catch (err) {
    console.log(err);
  }
}

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
    console.log('body', req.body);
    await Board.findByIdAndUpdate(req.params.id, req.body);
    res.send("Board updated successfully");
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

exports.deleteMemberInBoard = async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId);
    await Board.updateMany({ '_id': member.boards }, { $pull: { members: member._id } });
    
    res.json(member);
    
    console.log("removed")
    
  } catch (err) {
    console.log(err.message);
  }
};