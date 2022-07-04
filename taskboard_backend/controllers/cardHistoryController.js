const History = require("../models/cardHistory");

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
      path: "card",
      model: "Card",
      select: "name"
    });
    console.log('cardHistory', history);
    res.send(history);
  } catch(err) {
    console.log(err)
  }
}