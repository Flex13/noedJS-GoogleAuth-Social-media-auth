const res = require('express/lib/response');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys')
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});



passport.use(
    new GoogleStrategy({
        // options for google strategy
        realm: 'http://localhost:3000/',
        callbackURL: "http://localhost:3000/auth/google/redirect",
        passReqToCallback: true,
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
    }, (request, accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have this user
                console.log('user is: ', currentUser);
                // do something
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    provider: profile.provider,
                    username: profile.name.givenName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    // do something
                    done(null, newUser);
                });
            }
        });
    })
);