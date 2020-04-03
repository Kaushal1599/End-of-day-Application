const mongoose = require("mongoose");

const moment = require("moment");

var currentDate = moment(Date.now()).format();
currentDate = String(currentDate).slice(0, 10);

const DailyUpdateSchema = mongoose.Schema({
  task: {
    type: String,
    require: true
  },
  work: {
    type: String,
    require: true
  },
  hour: {
    type: Number,
    require: true
  },
  date: {
    type: String,
    default: currentDate
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("daily_update", DailyUpdateSchema);
