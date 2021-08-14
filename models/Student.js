const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    yearOfBatch: {
        type: Number,
    },
    collegeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'College',
        required: true
    },
    skills: {
        type: [String],
    }
});

module.exports = mongoose.model('Student', StudentSchema);