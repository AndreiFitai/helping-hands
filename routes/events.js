const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const upload = require("../utils/cloudinary");
const fs = require("fs");

/* GET home page */
router.get("/create-event", (req, res, next) => {
  res.render("event-create");
});

router.post("/create-event", (req, res, next) => {
  const {
    title,
    date,
    time,
    address,
    description,
    requirements,
    amount,
    car,
    sports,
    charity,
    local,
    lgbt,
    artistical,
    politics,
    educational,
    lat,
    lng
  } = req.body;
  new Event({
    title,
    date,
    time,
    address,
    description,
    needs: {
      amount_of_ppl: amount,
      need_desc: requirements,
      car: car
    },
    tags: {
      sports,
      charity,
      local,
      lgbt,
      artistical,
      politics,
      educational
    },
    location: { type: "Point", coordinates: [lat, lng] }
  })
    .save()
    .then(data => {
      res.render("/index");
    });
});

module.exports = router;
