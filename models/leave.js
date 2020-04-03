const mongoose = require("mongoose");

const LeaveSchema = mongoose.Schema({
  holiday: {
    type: Number,
    require: true
  },
  date_holiday: {
    type: Date,
    require: true
  },
  reason: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("leave", LeaveSchema);
