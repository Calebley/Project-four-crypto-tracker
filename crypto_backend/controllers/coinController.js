require("dotenv").config()
const express = require("express")
const router = express.Router()

const isAuth = require("../middleware/isAuth")

const userSchema = require("../models/User")
const favouritecoinSchema = require("../models/Favouritecoin")

//Add new coin to favourite list ====================================
router.post("/:coin_id/:user_id", async (req, res) => {
  
    try {
        const user = await userSchema.findById(req.params.user_id).select("-password")

        console.log(req.body.userId)
        console.log(req.body.coinUuid)
        const newCoin = new favouritecoinSchema({
            userId: req.body.userId,
            coinUuid: req.body.coinUuid
        })

        console.log(newCoin)
        newCoin.save()
    } catch (err) {
        res.status(500).send("Server error")
    }
})

module.exports = router