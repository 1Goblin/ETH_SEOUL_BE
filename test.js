const express = require("express");
const User = require("./models/User");
const mongoose = require("mongoose");
const router = require("express").Router();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const voteRouter = require("./routes/voteRoute");
const userRouter = require("./routes/userRoute");
const idolRouter = require("./routes/idolRoute");
const periodRouter = require("./routes/periodRoute");
const rankRouter = require("./routes/rankRoute");
const commuRouter = require("./routes/commuRoute");

app.use(cors({
  origin: 'http://localhost:3000' // 클라이언트 애플리케이션의 도메인으로 대체하세요.
}));

// Mongoose connection without the deprecated options

mongoose
  .connect(process.env.MONGO_URL, {
    connectTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000,
  })

  .then(() => {
    console.log("Connected to MongoDB via Mongoose");

    // Middleware

    app.use(express.json()); // app.use로 미들웨어로 등록해서 json데이터를 javascript객체로 변환
    app.use("/api/vote", voteRouter);
    app.use("/api/user", userRouter);
    app.use("/api/idol", idolRouter);
    app.use("/api/period", periodRouter);
    app.use("/api/rank", rankRouter);
    app.use("api/commu", commuRouter);
    // Start the Expr3qess server

    app.listen(8800, () => {
      console.log("Backend server is running");
    });
  })

  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
