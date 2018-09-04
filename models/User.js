const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  facebookId: String,
  password: String,
  picture: String,
  bio: String,
  role: {
    type: String,
    enum: ["Admin", "Moderator", "User"],
    default: "User"
  },
  exp: Number,
  events: [],
  options: {
    biweekly_email: {
      type: Boolean,
      default: false
    },
    event_msg_email: {
      type: Boolean,
      default: false
    },
    direct_msg_email: {
      type: Boolean,
      default: false
    }
  },
  interests: {
    interest_sports: {
      type: Boolean,
      default: false
    },
    interest_charity: {
      type: Boolean,
      default: false
    },
    interest_local: {
      type: Boolean,
      default: false
    },
    interest_lgbt: {
      type: Boolean,
      default: false
    },
    interest_artistical: {
      type: Boolean,
      default: false
    },
    interest_politics: {
      type: Boolean,
      default: false
    },
    interest_educational: {
      type: Boolean,
      default: false
    }
  },
  reported: {
    reporter_id: String,
    message: String,
    votes: Number
  }
});

module.exports = mongoose.model("User", userSchema);
