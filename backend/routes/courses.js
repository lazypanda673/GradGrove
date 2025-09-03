const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getCourses)
  .post(authorize('admin', 'faculty'), createCourse);

router.route('/:id')
  .get(getCourse)
  .put(authorize('admin', 'faculty'), updateCourse)
  .delete(authorize('admin'), deleteCourse);

module.exports = router;