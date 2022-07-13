require("dotenv").config()

const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/auth.routes.js")
const verficationRoutes = require("./routes/verfication.routes.js")
const uploadRoutes = require("./routes/upload.routes.js")
const postRoutes = require("./routes/post.routes.js")
const commentRoutes = require("./routes/comments.routes.js")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        msg: "Hello World!"
    })
})

app.use("/", authRoutes)
app.use("/", verficationRoutes)
app.use("/", uploadRoutes)
app.use("/", postRoutes)
app.use("/", commentRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log("Server is running", port);
})