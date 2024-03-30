const express = require("express");
const User = require("../models/User");
const Idol = require("../models/Idol");
const { getToken, isAuth } = require("../util");

const router = express.Router();

//아이돌 토탈토큰 정렬하기 전체 아이돌랭킹
router.put("/rank", async (req, res) => {
  try {
    // 아이돌들의 정보를 데이터베이스에서 가져옴
    const idols = await Idol.find(); //find()하면 전체 아이돌 정보가 들어감

    // 토큰 양을 오름차순으로 정렬
    idols.sort((a, b) => b.totalTokens - a.totalTokens);

    // 정렬된 아이돌 정보를 클라이언트에 응답
    res.json(idols);
  } catch (error) {
    // 오류 발생 시 오류 메시지를 클라이언트에 응답
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 아이돌 프로필 정보 가져오기
router.put("/idolProfile/:idolId", async (req, res) => {
  try {
    const { idolId } = req.params;
    const idol = await Idol.findOne(idolId);
    if (!idol) {
      return res.status(404).json({ message: "아이돌을 찾을 수 없습니다." });
    }
    res.json(idol);
  } catch (error) {
    console.error("Error fetching idol profile:", error);
    res.status(500).json({ message: "Failed to fetch idol profile" });
  }
});

// 특정 아이돌에 대한 투표를 많이한 상위 10명의 유저 및 토큰 수 응답
router.put("/idolTopFans/:idolId", async (req, res) => {
  try {
    const { idolId } = req.params;

    // 해당 아이돌의 정보 가져오기
    const idol = await Idol.findOne({ idolId: idolId });
    if (!idol) {
      return res.status(404).json({ message: "아이돌을 찾을 수 없습니다." });
    }

    // 해당 아이돌을 투표한 모든 유저들의 정보 가져오기
    const users = await User.find({ "myIdols.idolId": idolId });

    // 해당 아이돌을 투표한 유저들의 토큰 수를 기준으로 내림차순으로 정렬
    users.sort(
      (a, b) =>
        b.myIdols.find((item) => item.idolId === idolId).token -
        a.myIdols.find((item) => item.idolId === idolId).token
    );

    // 상위 10명의 유저 정보와 토큰 수 응답
    const topFans = users.slice(0, 10).map((user) => ({
      userId: user._id,
      nickname: user.nickname,
      token: user.myIdols.find((item) => item.idolId === idolId).token, //item.idolId는 나의아이돌의 idolid를 가리킴 item은 myidol
    }));
    console.log(topFans);
    res.json(topFans);
  } catch (error) {
    console.error("Error fetching top fans for idol:", error);
    res.status(500).json({ message: "Failed to fetch top fans for idol" });
  }
});

module.exports = router;
