const express = require("express")
const cors = require("cors")
const userRouter = require("./router/auth.router")
const postRouter = require("./router/post.router")
const cookieParser = require("cookie-parser")

const app = express()

// CORS configuration
app.use(cors({
  origin: "https://captiongenerator-frontend-6a1k.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", userRouter)
app.use("/api/post", postRouter)

module.exports = app