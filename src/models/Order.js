const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    departure: String,
    destination: String,
    minDate: Date,
    maxDate: Date,
    weight: Number,
    size: Number,
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

module.exports = mongoose.model('Order', OrderSchema)