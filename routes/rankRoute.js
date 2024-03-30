const express = require("express");
const router = express.Router();
const Rank = require("../models/rank");

//단일 아이돌 기간마다 랭킹정보
router.post("/:idolId", async (req, res) => {
  try {
    const { idolId } = req.params;

    // 해당 아이돌의 랭크 정보 가져오기
    const ranks = await Rank.find({ idolId: idolId });

    if (!ranks || ranks.length === 0) {
      return res
        .status(404)
        .send({ message: "해당 아이돌의 랭크 정보를 찾을 수 없습니다." });
    }

    return res.status(200).send(ranks); // 아이돌의 랭크 정보 응답으로 전송
  } catch (error) {
    console.error("에러:", error);
    res.status(500).send({
      message: "랭크 정보를 불러오는 중 오류가 발생했습니다.",
    });
  }
});

module.exports = router;
