const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const classroomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teacherId: {
      type: ObjectId,
      required: true,
  },
  studentId: {
    type: ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('classroom', classroomSchema);