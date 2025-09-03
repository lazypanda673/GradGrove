const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.register = asyncHandler(async (req, res, next) => {
  const { email, password, firstName, middleName, lastName, phone, institute, role, rollNumber, specialization, yearsOfExperience } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('User already exists', 400));
  }

  const userData = {
    email,
    password,
    firstName,
    middleName: middleName || '',
    lastName: lastName || '',
    phone,
    institute,
    role
  };

  if (role === 'student') userData.rollNumber = rollNumber;
  if (role === 'counsellor') {
    userData.specialization = specialization;
    userData.yearsOfExperience = yearsOfExperience;
  }

  const user = await User.create(userData);
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    data: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  if (role && user.role !== role) {
    return next(new ErrorResponse(`Access denied. Required role: ${role}`, 403));
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    data: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }
  });
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});