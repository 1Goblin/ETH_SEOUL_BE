const express = require("express");
const User = require("../models/User");
const Idol = require("../models/Idol");
const { getToken, isAuth } = require("../util");

const router = express.Router();

// 아이돌에게 투표하기
router.post(
  "/:idolId",
  /*isAuth, */ async (req, res) => {
    try {
      const { idolId } = req.params;
      const user = await User.findById("660559d0396708359076c3fe");
      //req.user._id에 지갑주소나 유저정보 아이디 들어가야함  findById는 몽고디비 메서드함수이고 _id아이디를 찾아줌 테스트하고싶으면 user의 _id 넣어보세요
      const idol = await Idol.findOne({ idolId: idolId });

      if (!user) {
        return res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
      }

      if (!idol) {
        return res.status(404).send({ message: "아이돌을 찾을 수 없습니다." });
      }

      // 사용자의 토큰 양 확인
      const availableTokens = user.tokens; //user.tokens 는 지갑에서 토큰양 불러와야함(수정해야함)

      if (availableTokens < 1) {
        //토큰수 1미만이면 토큰부족
        return res
          .status(400)
          .send({ message: "투표를 위한 토큰이 부족합니다." });
      }

      // 아이돌의 토탈토큰 수 증가
      idol.totalTokens += 1; //1대신 투표하는 양을 적으면 됨
      await idol.save();

      res.send({ message: "투표가 성공적으로 완료되었습니다." });
    } catch (error) {
      console.error("투표중 오류 발생:", error);
      res.status(500).send({ message: "투표 중 오류가 발생했습니다." });
    }
  }
);

module.exports = router;
