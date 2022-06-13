const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Member = require("../models/member");


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
    throw new Error('Member alredy existes');
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create member
  const member = await Member.create({
    name,
    email,
    password: hashedPassword
  })
  if (member) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      token: generateToken(member._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid member data');
  }
});

exports.loginMember = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //check for member email
  const member = await Member.findOne({ email });
  console.log(member);
  
  if (member && (await bcrypt.compare(password, member.password))) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
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
