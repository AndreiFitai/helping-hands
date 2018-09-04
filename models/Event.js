const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  organizer: String,
  poc: String,
  city: String,
  address: String,
  description: String,
  date: String,
  time: String,
  pictures: {
    path: String,
    name: String
  },
  tags: {
    sports: {
      type: Boolean,
      default: false
    },
    charity: {
      type: Boolean,
      default: false
    },
    local: {
      type: Boolean,
      default: false
    },
    lgbt: {
      type: Boolean,
      default: false
    },
    artistical: {
      type: Boolean,
      default: false
    },
    politics: {
      type: Boolean,
      default: false
    },
    educational: {
      type: Boolean,
      default: false
    }
  },
  needs: {
    amount_of_ppl: Number,
    need_desc: String,
    car: {
      type: Boolean,
      default: false
    }
  },
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },
  participants: [
    {
      userId: String,
      role: {
        type: String,
        enum: ["Organizer", "Volunteer"],
        default: "Volunteer"
      }
    }
  ],
  reported: {
    reporter_id: String,
    message: String,
    votes: Boolean
  }
});

module.exports = mongoose.model("Event", eventSchema);
