const Membre = require("../models/membre");

exports.createMembre = async (req, res) => {
  const membre = new Membre(req.body);
  try {
    const newMembre = await membre.save();
    res.json(newMembre);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllMembre = async (req, res) => {
  try {
    const membre = await Membre.find();
    res.json(membre);
  } catch (err) {
    console.log(err.message);
  }
};

exports.membreDelete = async (req, res) => {
  try {
    const deletedMembre = await Membre.findByIdAndDelete(req.params.id);
    res.json(deletedMembre);
  } catch (err) {
    console.log(err.message);
  }
};

exports.membreById = async (req, res) => {
  try {
    const membre = await Membre.findById(req.params.id);
    res.json(membre);
  } catch (err) {
    console.log(err.message);
  }
};

exports.MembreUpdate = async (req, res) => {
  try {
    await Membre.findByIdAndUpdate(req.params.id, req.body);
    res.send("Membre updated succesfully");
  } catch (err) {
    console.log(err);
  }
};
