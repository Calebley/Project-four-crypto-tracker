const mongoose = require("mongoose")
const Schema = mongoose.Schema

const favouriteCoinSchema = new Schema({
    userId: {
        type: String
    },
    coinUuid: {
        type: String,
        

    }
})

const FavouriteCoin = mongoose.model("favouriteCoin", favouriteCoinSchema)

module.exports = FavouriteCoin
