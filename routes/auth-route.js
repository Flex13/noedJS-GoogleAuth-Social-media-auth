const router = require('express').Router();
const passport = require('passport')
require('dotenv').config()

//auth Login
router.get('/login', (req, res) => {
    res.render('login')
})

//auth Login
router.get('/register', (req, res) => {
    res.render('register')
})

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// Auth Callback
router.get('/google/redirect',
    passport.authenticate('google', {
        successRedirect: process.env.ROOT_LIVE + '/auth/google/callback/success',
        failureRedirect: process.env.ROOT_LIVE + '/auth/google/callback/failure'
    }));


// Success
router.get('/google/callback/success', (req, res) => {
    if (!req.user)
        res.redirect('/google/callback/failure');
    res.redirect('/profile');
});

// failure
router.get('/google/callback/failure', (req, res) => {
    res.send("Error");
})


module.exports = router