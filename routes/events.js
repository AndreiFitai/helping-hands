const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "public/images/uploads"
});
const Event = require("../models/Event");
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/create-event", ensureLoggedIn("/auth/login"), (req, res, next) => {
  res.render("event-create");
});

router.get("/event/:id", (req, res, next) => {
  const _id = req.params.id;
  Event.findById({ _id }).then(data => {
    res.render("event-single", data);
  });
});

router.get("/list", (req, res, next) => {
  Event.find({}).then(data => {
    res.render("event-multi", { data });
  });
});
router.post("/list", (req, res, next) => {
  console.log(req.body)
  let filters = {
    keyword: req.body.keyword,
    start: req.body.from,
    end: req.body.to,
    nedd: req.body.need,
    sports: sports,
    charity: charit, 
    local: local,
    lgbt: lgbt,
    artistical: artistical,
    politics: politics,
    educational: educational,
  }
  // Event.find({req.params})
})

router.post("/create-event", upload.single("photo"), (req, res, next) => {
  const imgName = req.file.filename;
  const imgPath = `/images/uploads/${imgName}`;
  const organizer = { userId: req.user._id, role: "Organizer" };
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
    },
    participants: organizer
  })
    .save()
    .then(data => {
      res.redirect(`event/${data._id}`);
    });
});

module.exports = router;
