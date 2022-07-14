const Label = require('../models/label');

exports.getLabelsOfBoard = async (req, res) => {
  try {
    console.log('params', req.params);
    const label = await Label.find({ board: req.params.board });
    res.send(label);
  } catch (err) {
    console.log(err);
  }
}

exports.createLabel = async (req, res) => {
  try {
    console.log('body', req.body);
    const label = Label(req.body);
    await label.save();
    res.send(label);
  } catch (err) {
    console.log(err);
  }
}

exports.updateLabel = async (req, res) => {
  try {
    const labelToUpdate = await Label.findById(req.params.id);
    if(labelToUpdate.cards.includes(req.body.card)) return;
    console.log('body', req.body);
    console.log('label params', req.params);
    const updatedLabels = await Label.find({cards: [req.body.card]});
    for(let i = 0; i < updatedLabels.length; i++) {
      await Label.updateOne({_id: updatedLabels[i]._id}, {cards: updatedLabels[i].cards.filter((c) => c._id.toString() !== req.body.card)});
    }
    await Label.findByIdAndUpdate(labelToUpdate._id, { cards: [...labelToUpdate.cards, req.body.card] });
    res.send(updatedLabels);
    // res.send(label);
  } catch (err) {
    console.log(err);
  }
}