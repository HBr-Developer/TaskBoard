const Permission = require("../models/permission");

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