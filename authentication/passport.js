const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/users");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      let user = await User.findOne({ username });
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return done(err);
        } else if (result == false) return done(null, false);
        done(null, user);
      });
    } catch (error) {
      if (err) {
        return done(err);
      }
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    // console.log("Deserialize", id);
    let user = await User.findOne({ _id: id });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(err, false);
  }
});

module.exports = passport;
