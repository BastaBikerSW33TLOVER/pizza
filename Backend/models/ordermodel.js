const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    PizzaName:{
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    TotalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Order', orderSchema)