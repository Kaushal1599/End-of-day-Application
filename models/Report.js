const mongoose = require("mongoose");

const moment = require("moment");
var currentDate = moment(Date.now()).format();
currentDate = String(currentDate).slice(0, 10);

const FormSchema = mongoose.Schema({
  total: {
    type: Number,
    require: true
  },
  recieved: {
    type: Number,
    require: true
  },
  not_recieved: {
    type: Number,
    require: true
  },
  response: {
    type: String,
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

module.exports = mongoose.model("Report", FormSchema);
