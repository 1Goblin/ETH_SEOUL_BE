const mongoose = require("mongoose");

const rankSchema = new mongoose.Schema(
  {
    idolId: { type: String, required: true }, //아이돌아이디
    date: { type: Date, required: true }, //날짜
    token: { type: Number, required: true }, //특정 날짜에 아이돌의 누적토큰개수
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rank", rankSchema);
