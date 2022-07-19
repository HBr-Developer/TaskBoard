const Permission = require("../models/permission");
const Board = require("../models/board");
const Member = require("../models/member");

exports.allPermissions = async (req, res) => {
  try {
    const permission = await Permission.find().populate('board', 'name').populate({
      path: 'user',
      model: 'Member',
      select: 'name'
    })
    res.json(permission);
  } catch (err) {
    console.log(err);
  }
}

exports.addPermission = async (req, res) => {
  try {
    // create new permission
    const permission = await Permission.create(req.body);
    console.log('permission', permission);
    // add permission to the board
    const board = await Board.findById(req.body.board);
    await Board.updateOne({ _id: req.body.board }, { permissions: [...board.permissions, permission] });
    // add permission to the user
    await Member.updateOne({ _id: req.body.user }, { permissions: [...board.permissions, permission] });
    res.json(permission);
  } catch (err) {
    console.log(err);
  }
}

exports.updatePermission = async (req, res) => {
  try {
    console.log('body', req.body);
    const permission = await Permission.updateOne({board: req.body.board, user: req.body.user}, { role: req.body.role });
    res.send(permission);
  } catch(err) {
    console.log(err);
  }
}

exports.userPermissions = async (req, res) => {
  try {
    const permission = await Permission.find({user: req.params.member}, "_id").populate('board', 'name');
    res.send(permission);
  } catch(err) {
    res.send(err.response.data);
  }
}