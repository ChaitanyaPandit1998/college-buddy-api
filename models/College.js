const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    yearFounded: {
        type: Number,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    noOfStudents: {
        type: Number
    },
    courses: {
        type: [String],
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true
    }
});

CollegeSchema.virtual('students', {
    ref: 'Student',
    localField: '_id',
    foreignField: 'collegeId',
    justOne: false
});

module.exports = mongoose.model('College', CollegeSchema);