const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    "fname": {
        type: String,
        required: true
    },
    "lname": {
        type: String,
        required: true
    },
    "title": {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
    },
    "email": {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    "password": {
        type: String,
        required: true
    },
    "isDeleted": {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('author', authorSchema)