require("dotenv").config()
const express = require("express")
const router = express.Router()

const isAuth = require("../middleware/isAuth")

const userSchema = require("../models/User")
const favouriteCoinSchema = require("../models/Favouritecoin")

//Get all coins on watchlist
router.get("/:user_id", async (req, res) => {
    await favouriteCoinSchema.find({userid: req.params.user_id})
    .then(coin => {
        res.json(coin)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})


//Add new coin to watchlist ====================================
router.post("/:coin_id/:user_id", async (req, res) => {
  
    try {
        const user = await userSchema.findById(req.params.user_id).select("-password")

        console.log("id",req.body.id)
        console.log(req.body.cryptoInfo.uuid)
        const newCoin = new favouriteCoinSchema({
            userId: req.body.id,
            coinUuid: req.body.cryptoInfo.uuid
        })

        console.log(newCoin)
        newCoin.save()
    } catch (err) {
        res.status(500).send("Server error")
    }
})

module.exports = router