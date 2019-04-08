const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    loginToken: String
});

module.exports = mongoose.model('User', userSchema);