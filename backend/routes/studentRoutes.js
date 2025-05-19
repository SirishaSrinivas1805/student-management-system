// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

router.route('/students')
  .get(getAllStudents)
  .post(createStudent);

router.route('/students/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
