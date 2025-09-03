const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  async registerUser(userData) {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create user
    const user = await User.create(userData);
    
    // Generate token
    const token = this.generateToken(user._id);
    
    return {
      user: this._formatUser(user),
      token
    };
  }

  async loginUser(email, password) {
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = this.generateToken(user._id);
    
    return {
      user: this._formatUser(user),
      token
    };
  }

  async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this._formatUser(user);
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  _formatUser(user) {
    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      department: user.department,
      lastLogin: user.lastLogin,
      isActive: user.isActive
    };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    if (!(await user.comparePassword(currentPassword))) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return { success: true, message: 'Password updated successfully' };
  }
}

module.exports = new AuthService();