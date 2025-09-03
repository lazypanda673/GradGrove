const { validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

exports.studentValidationRules = () => {
  return [
    body('studentId').notEmpty().withMessage('Student ID is required'),
    body('personalInfo.firstName').notEmpty().withMessage('First name is required'),
    body('personalInfo.lastName').notEmpty().withMessage('Last name is required'),
    body('academicInfo.program').notEmpty().withMessage('Program is required'),
    body('academicInfo.semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1-8')
  ];
};

exports.userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required')
  ];
};