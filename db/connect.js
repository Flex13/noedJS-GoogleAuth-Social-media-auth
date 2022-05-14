const mongoose = require('mongoose')

//Function to Connect MonogDB
const connectDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDB