const express = require('express')
const authRoutes = require('./routes/auth-route')
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-config')
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const MongoStore = require('connect-mongo');
const connectDB = require('./db/connect');


//initiate express server
const app = express()
    //Connect Session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


//Set View
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

//Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('index');
});


//Start Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})


const port = process.env.PORT || 3000;
const start = async() => {
    try {
        await connectDB(keys.mongodb.dbURI);
        app.listen(port, () =>
            console.log(`Database and Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();