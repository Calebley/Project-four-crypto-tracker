const mongoose = require("mongoose")
const Schema = mongoose.Schema

const favouritecoinSchema = new Schema({
    coinName: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    }
})