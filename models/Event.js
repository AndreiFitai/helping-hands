const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  organizer: String,
  adress: String,
  
  events: [],
  reported: {
    reporter_id: String,
    message: String,
    votes: Boolean
  }
});

module.exports = mongoose.model("User", userSchema);
