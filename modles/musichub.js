const mongoose = require('mongoose')

const musichubSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    albumRunTime: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('musichub', musichubSchema)