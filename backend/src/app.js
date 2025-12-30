const express = require("express")
const cors = require("cors")
const userRouter = require("./router/auth.router")
const postRouter = require("./router/post.router")
const cookieParser = require("cookie-parser")

const app = express()

// CORS configuration
const allowedOrigins = [
  "https://captiongenerator-frontend-6a1k.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.PORT
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in production for debugging
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", userRouter)
app.use("/api/post", postRouter)

module.exports = app