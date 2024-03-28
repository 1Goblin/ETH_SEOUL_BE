const express = require("express");
const User = require("./models/User");
const mongoose = require("mongoose");
const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const authRouter = require('./routes/auth') // 해당 파일에서 정의한 라우트를 객체화 함
const voteRouter = require('./routes/voteRoute')
const userRouter = require('./routes/userRoute')

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
    app.use('/api', authRouter) // authRouter에서 정의된 모든 경로에 자동으로 /api 붙임
    app.use('/api', voteRouter)
    app.use('/api', userRouter)
    // Start the Expr3qess server

    app.listen(8800, () => {
      console.log("Backend server is running");
    });


  })

  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

