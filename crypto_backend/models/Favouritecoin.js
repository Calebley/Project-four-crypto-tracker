const mongoose = require("mongoose")
const Schema = mongoose.Schema

const favouriteCoinSchema = new Schema({
    watchlistId: {
        type: Number
    },
    userId: {
        type: String
    },
    coinUuid: {
        type: String,
        unique: true
    }
})

const FavouriteCoin = mongoose.model("favouriteCoin", favouriteCoinSchema)

module.exports = FavouriteCoin
