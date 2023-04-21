const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const classroomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacherId: {
      type: ObjectId,
      required: false,
  },
  studentId: {
    type: ObjectId,
    required: false,
  },
});

module.exports = mongoose.model('classroom', classroomSchema);