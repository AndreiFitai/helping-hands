const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "public/uploads/"
});
const Event = require("../models/Event")
/* GET home page */
router.get("/create-event", (req, res, next) => {
  res.render("event-create")
});

router.post("/create-event", upload.single("photo"), (req, res, next) => {
  const imgPath = req.file.path;
  const imgName = req.file.filename;
  console.log(imgName, imgPath)
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
      pictures: {
        path: imgPath,
        name: imgName
      },
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
      location: {
        type: "Point",
        coordinates: [lng, lat]
      }
    })
    .save()
    .then(data => {
      res.send(data)
    });
});

module.exports = router;