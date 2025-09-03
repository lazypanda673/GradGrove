const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  counsellor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  riskScore: {
    type: Number,
    min: 0,
    max: 1,
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved', 'Dismissed'],
    default: 'New'
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Alert', alertSchema);