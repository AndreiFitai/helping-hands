const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "public/images/uploads"
});
const Event = require("../models/Event");
const User = require("../models/User");
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/create-event", ensureLoggedIn("/auth/login"), (req, res, next) => {
  res.render("event-create");
});

router.get("/event/:id", (req, res, next) => {
  const _id = req.params.id;
  let eventData;
  Event.findById({
    _id
  }).then(data => {
    eventData = data;
    const promiseChain = [];
    const partArr = data.participants;
    for (let x = 0; x < partArr.length; x++) {
      promiseChain.push(
        User.findById({ _id: partArr[x]._id }).then(result => {
          return result;
        })
      );
    }
    Promise.all(promiseChain).then(particArr => {
      res.render("event-single", { eventData, particArr });
    });
  });
});

router.post("/join/:id", (req, res, next) => {
  console.log(req.body);
  const _id = req.params.id;
  const userId = req.user._id;
  Event.findOneAndUpdate(
    {
      _id
    },
    {
      $addToSet: {
        participants: {
          _id: userId
        }
      }
    },
    {
      new: true
    }
  ).then(data => {
    res.redirect("/events/event/" + _id);
  });
});

router.post("/leave/:id", (req, res, next) => {
  console.log(req.body);
  const _id = req.params.id;
  const userId = req.user._id;
  Event.findOneAndUpdate(
    {
      _id
    },
    {
      $pull: {
        participants: {
          _id: userId
        }
      }
    },
    {
      new: true
    }
  ).then(data => {
    res.redirect("/events/event/" + _id);
  });
});

router.get("/list", (req, res, next) => {
  Event.find({}).then(data => {
    res.render("event-multi", {
      data
    });
  });
});

router.post("/list", (req, res, next) => {
  // console.log(req.body)

  // need: req.body.need,
  // sports: req.body.sports,
  // charity: req.body.charity,
  // local: req.body.local,
  // lgbt: req.body.lgbt,
  // artistical: req.body.artistical,
  // politics: req.body.politics,
  // educational: req.body.educational,

  Event.find({
    $and: [
      { $text: { $search: req.body.keyword } },
      {
        $and: [
          { date: { $gte: req.body.from } },
          { date: { $lte: req.body.to } }
        ]
      }
    ]
  }).then(data => {
    console.log(data);
    res.render("event-multi", { data });
  });
});

router.post("/create-event", upload.single("photo"), (req, res, next) => {
  let imgName;
  let imgPath;
  if (req.file) {
    imgName = req.file.filename;
    imgPath = `/images/uploads/${imgName}`;
  } else {
    imgName = "default-image";
    imgPath = `/images/default-event.png`;
  }
  const organizer = {
    _id: req.user._id,
    role: "Organizer"
  };
  const {
    title,
    date,
    time,
    city,
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
  const defaultImg = "/images/default-user.png";
  new Event({
      title,
      date,
      time,
      city,
      address,
      description,
      short_description: req.body.description.substring(0,97) + "...",
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
