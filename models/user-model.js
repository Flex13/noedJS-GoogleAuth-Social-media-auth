const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    gender: String,
    email: String,
    image: String,
    provider: String,
    firstName: String,
    lastName: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;