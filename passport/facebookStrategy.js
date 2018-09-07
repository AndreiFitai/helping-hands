const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

passport.use(
  new FacebookStrategy(
    {
      clientID: 553634161737995,
      clientSecret: "854eec2a4638eed8dbf583bbd39375ca",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["displayName", "email", "picture.type(large)"]
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("PROFILE", profile._json.email);
      console.log(profile._json.picture.data);
      const name = profile.displayName;
      User.findOneAndUpdate(
        {
          email: profile._json.email
        },
        {
          email: profile._json.email,
          name: profile._json.name,
          picture: profile._json.picture.data.url
        },
        {
          upsert: true,
          new: true
        },
        function(err, user) {
          if (err) {
            return done(err);
          }
          done(null, user);
        }
      );
    }
  )
);
