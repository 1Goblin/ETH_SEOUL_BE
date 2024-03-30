const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    idolId: { type: String, required: true }, //아이돌아이디
    postId: { type: Date, required: true }, //날짜
    nickname: { type: Number, required: true }, //특정 날짜에 아이돌의 누적토큰개수
    like: { type: Number, default: 0 }, //특정 날짜에 아이돌의 누적토큰개수
    title: { type: Number },
    content: { type: Number }, //특정 날짜에 아이돌의 누적토큰개수
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rank", rankSchema);
