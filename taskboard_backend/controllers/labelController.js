const Label = require("../models/label");

exports.createLabel = async (req, res) => {
  try {
    console.log(req.body);
    const label = await Label.create(req.body);
    res.send(label);
  } catch (err) {
    console.log(err);
  }
}

exports.getLabelOfCard = async (req, res) => {
  try {
    console.log('request', req);
    const label = await Label.find({card: req.params.cardId}, "name color");
    res.send(label);
  } catch(err) {
    console.log(err);
  }
}

exports.updateLabel = async (req, res) => {
  try {
    const response = await Label.updateOne({card: req.params.cardId}, {color: req.body.color, name: req.body.name});
    res.send(response);
  } catch(err) {
    console.log(err);
  }
}