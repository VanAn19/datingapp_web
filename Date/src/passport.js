const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const { v4: uuidv4} = require('uuid');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

// GOOGLE
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const tokenLogin = uuidv4();
    profile.tokenLogin = tokenLogin;
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });
        await user.save();
      } else {
        user.name = profile.displayName;
        await user.save();
      }
      // const newAccessToken = jwt.sign({id: user.id}, process.env.JWT_ACCESS_KEY, { expiresIn: '2d'});
      // accessToken = newAccessToken;
      // console.log(profile);
      return cb(null, user);
    } catch(err) {
      console.log(err);
      return cb(err);
    }
  }
));

// FACEBOOK
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['email', 'photos', 'id', 'displayName']
},
  async function (accessToken, refreshToken, profile, cb) {
    const tokenLogin = uuidv4();
    profile.tokenLogin = tokenLogin;
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });
        await user.save();
      } else {
        user.name = profile.displayName;
        await user.save();
      }
      return cb(null, user);
    } catch(err) {
      console.log(err);
      return cb(err);
    }
  }
));