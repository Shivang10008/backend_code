const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Username: String,
    Email: String,
    Password: String,
    Dob: Date,
    createAt: Date
});

module.exports = mongoose.model('user', userSchema);
