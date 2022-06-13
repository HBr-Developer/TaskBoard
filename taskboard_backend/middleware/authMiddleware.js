const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Member = require('../models/member');

exports.protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get member from the token
      req.member = await Member.findById(decoded.id).select('-password')
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});