const CardPermission = require("../models/CardPermissionModel");
const Card = require("../models/card");
const Member = require("../models/member");

exports.allPermissions = async (req, res) => {
  try {
    const permission = await CardPermissions.find().populate('card', 'name').populate({
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
    const permission = await CardPermission.create(req.body);
    // add permission to the card
    const card = await Card.findById(req.body.card);
    await Card.updateOne({ _id: req.body.card }, { cardPermissions: [...card.cardPermissions, permission._id] });
    // add permission to the user
    const member = await Member.findById(req.body.user);
    await Member.updateOne({ _id: req.body.user }, { cardPermissions: [...member.cardPermissions, permission._id] });
    res.json(permission);
  } catch (err) {
    console.log(err);
  }
}

exports.getCardPermissionsOfMember = async (req, res) => {
  try {
    const permissions = await CardPermission.find({user: req.params.member});
    res.send(permissions);
  } catch(err) {
    res.status(err.status).send(err.response);
  }
}