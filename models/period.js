const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true }, //투표 시작날짜
    endDate: { type: Date, required: true }, //투표 끝나는 날짜
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("period", periodSchema);
