exports.formatResponse = (success, data, message = '') => {
  return {
    success,
    data,
    message
  };
};

exports.paginate = (model, query, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const skip = (page - 1) * limit;

  return model.find(query).skip(skip).limit(limit);
};

exports.calculatePagination = (total, page, limit) => {
  return {
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1
  };
};

exports.sanitizeUser = (user) => {
  const userObject = user.toObject ? user.toObject() : user;
  const { password, __v, ...sanitizedUser } = userObject;
  return sanitizedUser;
};

exports.generateRandomPassword = (length = 12) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};