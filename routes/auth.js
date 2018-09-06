const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");

authRoutes.get(
  "/facebook",
  passport.authenticate("facebook", {
    profileFields: ["id", "displayName", "photos", "email"]
  })
);

authRoutes.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", {
    message: req.flash("error")
  });
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

authRoutes.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    res.render("auth/login", {
      message: "Indicate email and password"
    });
    return;
  }

  User.findOne(
    {
      email
    },
    "email",
    (err, user) => {
      if (user !== null) {
        res.render("auth/login", {
          message: "An account with this email already exists"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const defaultImg = "/images/default-user.png";

      const newUser = new User({
        name,
        email,
        password: hashPass,
        picture: defaultImg
      });

      newUser.save(err => {
        if (err) {
          res.render("auth/login", {
            message: "Something went wrong"
          });
        } else {
          req.logIn(newUser, function(err) {
            return res.redirect("/");
          });
        }
      });
    }
  );
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
