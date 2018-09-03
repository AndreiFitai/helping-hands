const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  facebookId: String,
  picture: String,
  bio: String,
  role: {
    type: String,
    enum: ["Admin", "Moderator", "User"],
    default: "User"
  },
  exp: Number
  events: [],
  options: {
    biweekly_email: Boolean,
    event_msg_email: Boolean,
    direct_msg_email: Boolean
  },
  interests: {
    interest_sports: Boolean,
    interest_charity: Boolean,
    interest_local: Boolean,
    interest_lgbt: Boolean,
    interest_artistical: Boolean,
    interest_politics: Boolean,
    interest_educational: Boolean
  },
  reported: {
    reporter_id: String,
    message: String,
    votes: Boolean
  }
});

module.exports = mongoose.model("User", userSchema);
