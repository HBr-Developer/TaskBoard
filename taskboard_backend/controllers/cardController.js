const Card = require("../models/card");
const List = require("../models/list");
const CardPermissions = require("../models/cardPermissionModel");
const Member = require("../models/member");

exports.createCard = async (req, res) => {
  try {
    const list = await List.findById(req.body.list_id);
    // create new cardPermission
    const cardPermission = new CardPermissions({role: req.body.role});
    // create new card with permission
    const newCard = new Card({ ...req.body, list_id: list._id, cardPermissions: [cardPermission] });
    // add card to it's list
    await List.findByIdAndUpdate(list._id, {
      ...list._doc,
      cards: [...list.cards, newCard],
    });
    // retrieve logged member and add cardPermission to it
    const member = await Member.findById(req.member.id, "cardPermissions");
    await Member.findOneAndUpdate({ _id: req.member.id }, { cardPermissions: [...member.cardPermissions, cardPermission._id] });
    cardPermission.user = member._id;
    cardPermission.card = newCard._id;
    await cardPermission.save();
    await newCard.save();
    res.json(newCard);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate({ path: "cardPermissions", model: "CardPermissions", select: "role user" });
    res.json(cards);
  } catch (err) {
    console.log(err.message);
  }
};

exports.cardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate("list_id", "name")
      .populate({
      path: "cardPermissions",
      model: "CardPermissions",
      select: "user role",
      populate: {
        path: "user",
        model: "Member",
        select: "name email"
      }
    });
    res.json(card);
  } catch (err) {
    console.log(err.message);
  }
};

exports.cardDelete = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    const list = await List.findById(deletedCard.list_id);
    const newList = await List.updateOne(
      { _id: list._id },
      {
        ...list._doc,
        cards: list.cards.filter((card) => !card._id.equals(deletedCard._id)),
      }
    );
    console.log("oldList", list);
    console.log("newList", newList);
    res.json(deletedCard);
  } catch (err) {
    console.log(err.message);
  }
};

exports.cardUpdate = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
