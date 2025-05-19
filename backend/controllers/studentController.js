const Student = require('../models/studentModel');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    return res.status(201).json(student);
  } catch (error) {
    console.error('Error creating student:', error.message);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      return res.status(200).json(student);
    } else {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student by ID:', error.message);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (student) {
      return res.status(200).json(student);
    } else {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error updating student:', error.message);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student) {
      return res.status(200).json({ message: 'Student deleted' });
    } else {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error deleting student:', error.message);
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};
