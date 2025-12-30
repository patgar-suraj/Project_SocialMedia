const express = require("express")
const cors = require("cors")
const userRouter = require("./router/auth.router")
const postRouter = require("./router/post.router")
const cookieParser = require("cookie-parser")

const app = express()

// CORS configuration
const allowedOrigins = [
  "https://captiongenerator-frontend-6a1k.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", userRouter)
app.use("/api/post", postRouter)

module.exports = app