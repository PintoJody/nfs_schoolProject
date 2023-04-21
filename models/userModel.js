const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password : {
      type: String,
      required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid e-mail format");
      }
    },
  },
  role : {
    type: String,
    required: true,
    default: "user"
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model('user', userSchema);