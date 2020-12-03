const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    departure: String,
    destination: String,
    tripDate: Date,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    toJSON: {
        virtuals: true
    }
})

module.exports = mongoose.model('Trip', TripSchema)