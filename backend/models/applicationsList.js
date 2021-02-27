const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    status: {
        type: String,
        trim: true
    }
});

const Application = mongoose.model('Applications', applicationSchema)
module.exports = Application
