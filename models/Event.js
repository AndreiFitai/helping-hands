const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  organizer: String,
  poc: String,
  address: String,
  description: String,
  date: Date
  pictures:[String]
  needs:{
    ammount_of_ppl: Number,
    need_desc: String,
    car: Boolean,
  }
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },
  participants: [{
    userId: String,
    { type: String,
      enum: ["Organizer", "Volunteer"],
      default: "Volunteer"}
  }]
  reported: {
    reporter_id: String,
    message: String,
    votes: Boolean
  }
});

module.exports = mongoose.model("User", userSchema);
