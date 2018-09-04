const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get(
  "/user-profile/:id",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    if (req.user._id === req.params.id || !req.params.id) {
      User.find({ _id: req.user._id }).then(data => {
        res.render("user-profile", data[0]);
      });
    } else {
      User.find({ _id: req.params.id }).then(data => {
        res.render("user-profile", data[0]);
      });
    }
  }
);

router.get("/user-edit", ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.find({ _id: req.user._id }).then(data => {
    res.render("user-edit", data[0]);
  });
});

module.exports = router;
