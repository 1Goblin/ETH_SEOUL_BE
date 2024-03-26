const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, required: true, unique: true }, //지갑주소, 유니크해야함, required는 필수적으로 제공되어야한다
    username: { type: String, required: true, unique: true }, //닉네임, 유니크해야함
    interestedIdols: [
      //관심아이돌 배열로 설정해서 여러명 선택가능
      {
        name: { type: String, required: true },
      },
    ],
    myIdols: [
      //나의 아이돌
      {
        name: { type: String, required: true },
        token: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
