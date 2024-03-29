const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema(
  {
    startDate: { type: Date }, //투표 시작날짜 이건 프론트에서 현재날짜 받아올거임
    endDate: { type: Date }, //투표 끝나는 날짜 2주기간 끝나는 날짜
    weekCount: { type: Number, default: 0 }, //총 8주의 기간 2주마다 counter시간 초기화할때 사용(endDate바꿔줄거임)
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("period", periodSchema);
