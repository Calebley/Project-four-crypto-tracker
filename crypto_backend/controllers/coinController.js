require("dotenv").config()
const express = require("express")
const router = express.Router()

const isAuth = require("../middleware/isAuth")

const userSchema = require("../models/User")
const favouriteCoinSchema = require("../models/Favouritecoin")

//Get all coins on watchlist
router.get("/:user_id", async (req, res) => {
    await favouriteCoinSchema.find({ userid: req.params.user_id })
        .then(coin => {
            res.json(coin)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

//Add new coin to watchlist ====================================
router.post("/:coin_id/:user_id", async (req, res) => {

    console.log("body", req.body)

    try {
        const user = await userSchema.findById(req.params.user_id).select("-password")

        //Create coin watchlist id
        function coinIdGenerator() {

            this.length = 8;
            this.timestamp = +new Date;

            let _getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            this.generate = function () {
                let ts = this.timestamp.toString();
                let parts = ts.split("").reverse();
                let id = "";

                for (let i = 0; i < this.length; ++i) {
                    let index = _getRandomInt(0, parts.length - 1);
                    id += parts[index];
                }

                return id;
            }
        }


        console.log("id", user)

        const create_id = new coinIdGenerator()
        const watchlistId = create_id.generate()
        const newCoin = new favouriteCoinSchema({
            watchlistId: watchlistId,
            coinUuid: req.body.coin,
            userId: req.body.user
        })

        console.log(newCoin)
        newCoin.save()
    } catch (err) {
        res.status(500).send("Server error")
    }
})

//Delete a coin =====================================================
router.delete("/delete/:watchlist_id", async(req, res) => {
    try{
        console.log(req.params.watchlist_id)
        await favouriteCoinSchema.remove({watchlistId: req.params.watchlist_id})
        res.status(200).send("success")
    } catch (error) {
        res.status(500).send("server error")
    }
})

module.exports = router