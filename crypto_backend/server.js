require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const bcrypt = require("bcrypt")
const morgan = require("morgan")

const app = express()
const PORT = 3001
const MONGODB_URI = "mongodb://localhost:27017/crypto"

const User = require("./models/User")

//Middleware - cookie session
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:4000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
)

//Middleware - parsing
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("tiny"))

//Mongoose connection
mongoose.connection.on("error", (err) => 
    console.log(err.message + " is Mongo not running?")
)
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"))

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
  });
  mongoose.connection.once("open", () => {
    console.log("connected to mongoose...");
  });

//Login =========================================
app.post("/login", async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({username})

    if(!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }]})
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }]})
    }

    const sessUser = { id: user.id, name: user.username, password: user.password }
    req.session.user = sessUser

    res.status(201).json({data: sessUser})
})

//Register =========================================
app.post("/register", async (req, res) => {
    console.log("req.body", req.body)
    const { username, email, password } = req.body

    let user = await User.findOne({email})

    if (user) {
        return res.status(400).json({ errors: [{ msg: "User exists!" }]})
    }

    const hashedPw = await bcrypt.hash(password, 12)

    user = new User({
        username,
        email,
        password: hashedPw
    })

    await user.save()
})

app.get("/", (req, res) => {
    res.send("Project 4")
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})