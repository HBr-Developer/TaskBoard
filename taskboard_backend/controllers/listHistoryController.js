const History = require("../models/listHistory");

//create new history
exports.createHistory = async (req, res) => {
  try {
    const history = await History.create(req.body);
    res.send(history);
  } catch(err) {
    console.log(err)
  }
}

//get history
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({board: req.params.boardId}).populate({
      path: "user",
      model: "Member",
      select: "name"
    }).populate({
      path: "list",
      model: "List",
      select: "name"
    });
    console.log('listHistory', history);
    res.send(history);
  } catch(err) {
    console.log(err)
  }
}