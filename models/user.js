const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  emp_id: {
    type: String,
    required: true,
    primarykey: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("user", UserSchema);
