const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Member = require("../models/member");
const Board = require("../models/board");

exports.registerMember = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  //check if user exists
  const userExists = await Member.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Member already exists');
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create member
  const member = await Member.create({
    name,
    email,
    password: hashedPassword,
    role: 'user',
    color: Math.floor(Math.random() * 4)
  })
  if (member) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      color: member.color,
      role: member.role,
      token: generateToken(member._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid member data');
  }
});

exports.updateMember = asyncHandler(async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const memberToUpdate = await Member.findById(req.params.memberId);
  const { name, email, currentPassword, newPassword } = req.body;
  const data = {};
  
  if (!name || !email || !currentPassword) {
    res.status(400).send('Please add all fields');
  }
  
  if (await bcrypt.compare(currentPassword, memberToUpdate.password)) {
    console.log('passwords match');
    if (newPassword !== '') {
      data.password = await bcrypt.hash(newPassword, salt);
    }
    if (memberToUpdate.email !== email) {
      data.email = email;
    }
    if (memberToUpdate.name !== name) {
      data.name = name;
    }
    console.log('data', data);
    await Member.findByIdAndUpdate(memberToUpdate._id, data);
    res.send(memberToUpdate);
  } else {
    res.status(400).send('Password is invalid');
  }
});

exports.loginMember = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for member email
  const member = await Member.findOne({ email });
  if (member && (await bcrypt.compare(password, member.password))) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      color: member.color,
      role: member.role,
      token: generateToken(member._id)
    })
  } else {
    res.status(400);
    throw new Error('invalid credentials');
  }
});

exports.getMe = asyncHandler(async (req, res) => {
  // const { _id, name, email } = await Member.findById(req.member.id);
  res.status(200).json(req.member);
});

exports.getAllMembers = asyncHandler(async (req, res) => {
  try {
    const members = await Member.find({ role: 'user' });
    res.status(200).json(members);
  } catch (err) {
    console.log(err);
  }
});

exports.getMembersOfBoard = asyncHandler(async (req, res) => {
  try {
    // const members = await Member.find().populate('permissions').populate("permissions");
    const board = await Board.findById(req.params.boardId, 'name descData createdAt updatedAt').populate({
      path: 'permissions',
      select: 'role board',
      populate: {
        path: 'user',
        model: 'Member',
        select: 'name email color'
      }
    });
    const users = board.permissions.map((permission) => ({ user: permission.user, role: permission.role }));
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}


// exports.createMember = async (req, res) => {
//   const member = new Member(req.body);
//   try {
//     const newmember = await member.save();
//     res.json(newMember);
//   } catch (err) {
//     console.log(err);
//   }
// };
//
// exports.getAllMember = async (req, res) => {
//   try {
//     const member = await Member.find();
//     res.json(member);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
//
// exports.memberDelete = async (req, res) => {
//   try {
//     const deletedMember = await Member.findByIdAndDelete(req.params.id);
//     res.json(deletedMember);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
//
// exports.memberById = async (req, res) => {
//   try {
//     const member = await Member.findById(req.params.id);
//     res.json(member);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
//
// exports.MemberUpdate = async (req, res) => {
//   try {
//     await Member.findByIdAndUpdate(req.params.id, req.body);
//     res.send("Member updated succesfully");
//   } catch (err) {
//     console.log(err);
//   }
// };
