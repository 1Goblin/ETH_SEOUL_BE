const express = require("express");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

// MongoDB Atlas 연결 설정
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB에 연결되었습니다.");

    // 모델 스키마 정의
    const Schema = mongoose.Schema;
    const exampleSchema = new Schema({
      name: String,
      age: Number,
    });

    // 모델 생성
    const ExampleModel = mongoose.model("idol", exampleSchema);

    // 예제 데이터 생성 및 저장
    const exampleData = new ExampleModel({
      name: "hello",
      age: 20,
    });

    exampleData
      .save()
      .then((result) => {
        console.log("데이터가 성공적으로 저장되었습니다:", result);
      })
      .catch((error) => {
        console.error("데이터 저장 오류:", error);
      });
  })
  .catch((error) => {
    console.error("MongoDB 연결 오류:", error);
  });
