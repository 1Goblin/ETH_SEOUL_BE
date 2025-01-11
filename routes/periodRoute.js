const express = require("express");
const router = express.Router();
const Period = require("../models/period");

// 현재시간 및 투표 기간 응답
router.put("/currentPeriod", async (req, res) => {
  try {
    // 현재 시간 가져오기
    const currentDate = new Date();
    console.log(currentDate);

    // 투표 기간 가져오기
    const period = await Period.findOne().sort({ createdAt: -1 }); // 가장 최근의 투표 기간 가져오기
    console.log(period);

    if (!period) {
      return res.status(404).send({ message: "투표 기간이 없습니다." });
    }

    const { startDate, endDate, weekCount } = period;

    // 남은 기간 계산
    const remainingTime = endDate.getTime() - currentDate.getTime(); // 밀리초 단위로 남은 시간 계산, getTime()은 초로변환시켜서 계산하기 쉽게 만들어줌

    const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24)); // 남은 일 수
    const remainingHours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ); // 남은 시간
    const remainingMinutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    ); // 남은 분
    const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000); // 남은 초

    console.log(
      remainingDays +
        "일 " +
        remainingHours +
        "시간 " +
        remainingMinutes +
        "분 " +
        remainingSeconds +
        "초"
    ); // 출력: 14일 0시간 0분 0초

    res.send({
      currentTime: currentDate, //현재 시간 보냄
      remainingTime, //남은시간 초단위로 보냄
      currentWeek: weekCount, //8주중 2주씩 나눠서하니까 1부터 4까지있는건데 데이터에는 일단 1로해놓음
    });
  } catch (error) {
    console.error("에러:", error);
    res.status(500).send({
      message: "현재 시간 및 투표 기간을 가져오는 중 오류가 발생했습니다.",
    });
  }
});

module.exports = router;
