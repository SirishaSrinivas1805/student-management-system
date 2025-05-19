const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id : { type: Number, immutable: true},
  name: String,
  regNo: String,
  email: String,
  mobileNo: String,
  percentage: String,
  city: String,
  state: String
});

module.exports = mongoose.model('Student', studentSchema);
