const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const { httpServer, app } = require("./socket/socket")


mongoose.connect(process.env.MONGO_URL)

// const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))


app.use("/api/notes", require("./routes/blog.route"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not found" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Server Error", err: err.message })
})

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
})

httpServer.listen(process.env.PORT, console.log("SERVER RUNNING"))