require("dotenv").config()

const express = require("express")
const app = express()
const PORT = 3001

app.get("/", (req, res) => {
    res.send("Project 4")
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})