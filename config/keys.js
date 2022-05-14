require('dotenv').config()
    //file will be added to git ignore

module.exports = {
    google: {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret
    },
    mongodb: {
        dbURI: process.env.MONGO_URI
    },
    session: {
        cookieKey: process.env.COOKIE_SECRET
    }
}