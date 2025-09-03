const Student = require('../models/Student');
const Prediction = require('../models/Prediction');
const mlService = require('./ml/MLService');
const { STUDENT_STATUS, RISK_LEVELS } = require('../config/constants');

class StudentService {
  async createStudent(studentData) {
    return await Student.create(studentData);
  }

  async getStudentById(studentId) {
    return await Student.findById(studentId)
      .populate('counselor', 'firstName lastName email department')
      .populate('riskHistory');
  }

  async getAllStudents(filters = {}, pagination = {}) {
    const { page = 1, limit = 10 } = pagination;
    const query = this._buildQuery(filters);
    
    const students = await Student.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('counselor', 'firstName lastName email');

    const total = await Student.countDocuments(query);

    return {
      students,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async updateStudent(studentId, updateData) {
    return await Student.findByIdAndUpdate(studentId, updateData, {
      new: true,
      runValidators: true
    });
  }

  async predictStudentRisk(studentId) {
    const student = await this.getStudentById(studentId);
    
    if (!student) {
      throw new Error('Student not found');
    }

    const features = this._extractFeatures(student);
    const prediction = await mlService.predictDropoutRisk(features);

    // Save prediction
    const predictionRecord = await Prediction.create({
      student: studentId,
      riskScore: prediction.riskScore,
      riskLevel: prediction.riskLevel,
      features: features,
      importantFactors: prediction.importantFactors,
      modelVersion: prediction.modelVersion,
      confidence: prediction.confidence,
      recommendations: prediction.recommendations
    });

    // Update student status based on risk level
    let newStatus = student.status;
    if (prediction.riskLevel === RISK_LEVELS.HIGH) {
      newStatus = STUDENT_STATUS.AT_RISK;
    }

    await Student.findByIdAndUpdate(studentId, {
      status: newStatus,
      $push: {
        riskHistory: {
          score: prediction.riskScore,
          level: prediction.riskLevel,
          timestamp: new Date(),
          factors: prediction.importantFactors.map(f => f.feature)
        }
      },
      lastPrediction: new Date()
    });

    return predictionRecord;
  }

  async batchPredictStudents(studentIds) {
    const predictions = [];
    
    for (const studentId of studentIds) {
      try {
        const prediction = await this.predictStudentRisk(studentId);
        predictions.push({
          studentId,
          success: true,
          prediction
        });
      } catch (error) {
        predictions.push({
          studentId,
          success: false,
          error: error.message
        });
      }
    }
    
    return predictions;
  }

  _buildQuery(filters) {
    const query = {};
    
    if (filters.program) query['academicInfo.program'] = filters.program;
    if (filters.semester) query['academicInfo.semester'] = filters.semester;
    if (filters.status) query.status = filters.status;
    if (filters.riskLevel) query['riskAssessment.level'] = filters.riskLevel;
    if (filters.counselor) query.counselor = filters.counselor;
    
    // Text search
    if (filters.search) {
      query.$or = [
        { studentId: { $regex: filters.search, $options: 'i' } },
        { 'personalInfo.firstName': { $regex: filters.search, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: filters.search, $options: 'i' } },
        { 'personalInfo.email': { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    return query;
  }

  _extractFeatures(student) {
    return {
      attendance_rate: student.academicInfo.attendance || 0,
      exam_score: student.academicInfo.cgpa * 10 || 0, // Convert CGPA to percentage
      num_backlogs: student.academicInfo.backlogs || 0,
      assignment_rate: student.academicInfo.assignmentCompletion || 0,
      family_income: student.riskFactors.familyIncome || 0,
      distance_minutes: (student.riskFactors.distanceFromCampus || 0) * 60, // Convert km to minutes
      family_support_score: student.riskFactors.familySupport || 3,
      motivation_score: student.riskFactors.motivationLevel || 3,
      stress_level: student.riskFactors.stressLevel || 3,
      financial_stress: student.riskFactors.financialStress || 3,
      learning_resources: student.riskFactors.learningResources || 3
    };
  }

  async getStatistics() {
    const totalStudents = await Student.countDocuments();
    const atRiskStudents = await Student.countDocuments({ status: STUDENT_STATUS.AT_RISK });
    const highRiskPredictions = await Prediction.countDocuments({ riskLevel: RISK_LEVELS.HIGH });
    
    const programStats = await Student.aggregate([
      { $group: { _id: '$academicInfo.program', count: { $sum: 1 } } }
    ]);
    
    const riskLevelStats = await Prediction.aggregate([
      { $group: { _id: '$riskLevel', count: { $sum: 1 } } }
    ]);
    
    return {
      totalStudents,
      atRiskStudents,
      highRiskPredictions,
      programStats,
      riskLevelStats
    };
  }
}

module.exports = new StudentService();