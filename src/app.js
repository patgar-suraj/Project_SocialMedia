const express = require("express")
const userRouter = require("./router/auth.router")
const postRouter = require("./router/post.router")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", userRouter)
app.use("/api/post", postRouter)

module.exports = app