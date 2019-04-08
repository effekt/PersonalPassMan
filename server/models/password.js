const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let passwordSchema = new mongoose.Schema({
    website: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Password', passwordSchema);