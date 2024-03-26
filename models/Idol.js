const mongoose = require("mongoose");

const IdolSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true, unique: true }, //아이돌의 id 이고 1씩증가되게 할 예정(구현해야됨)
    name: { type: String, required: true }, //아이돌이름
    birth: { type: Date, required: true }, //생년월일
    agency: { type: String }, //소속사
    profilePic: { type: String, default: "" }, // 프로필 사진의 URL을 저장, 사진이 없는경우를 대비해 default를 ""으로 설정
    totalTokens: { type: Number, default: 0 }, //아이돌의 누적토큰 디폴트를 0으로 설정
    passionateFan: [
      //토큰을 많이 기부한 10명의 팬들을 저장하는 스키마
      {
        name: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// passionateFan 배열의 길이를 최대 10으로 제한하는 validator 함수 추가(추가 서비스 사용할 수 있는 상위 10명 추출)
IdolSchema.path("passionateFan").validate(function (value) {
  return value.length <= 10;
}, "Passionate fan array can contain at most 10 fans");

module.exports = mongoose.model("Idol", IdolSchema);
