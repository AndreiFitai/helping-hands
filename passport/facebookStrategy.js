const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: 553634161737995,
      clientSecret: "854eec2a4638eed8dbf583bbd39375ca",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("PROFILE", profile);
      User.findOneAndUpdate(
        {
          email: profile.email
        },
        {
          email: profile.email
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
