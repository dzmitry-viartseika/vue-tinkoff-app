const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
        required: true,
    }
});

const Application = mongoose.model('Applications', applicationSchema)
applicationSchema.plugin(mongoosePaginate);
module.exports = Application
