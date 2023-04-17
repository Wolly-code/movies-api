const mongoose = require('mongoose');

// Define Genre Schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Define pre-save hook to update updatedAt field
genreSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Create Genre model using the genreSchema
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;