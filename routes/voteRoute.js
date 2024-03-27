import express from "express";
import User from "../models/User";
import Idol from "../models/Idol";
import { getToken, isAuth } from "../util";

const router = express.Router();

// 아이돌에게 투표하기
router.post("/idolProfile/:idolId", isAuth, async (req, res) => {
  try {
    const { idolId } = req.params;
    const user = await User.findById(req.user._id);
    const idol = await Idol.findById(idolId);

    if (!user) {
      return res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    }

    if (!idol) {
      return res.status(404).send({ message: "아이돌을 찾을 수 없습니다." });
    }

    // 사용자의 토큰 양 확인
    const availableTokens = user.tokens; //user.tokens 는 지갑에서 토큰양 불러와야함(수정해야함)
    const voteCost = 1; // 한 투표당 필요한 최소 토큰의 양

    if (availableTokens < voteCost) {
      return res
        .status(400)
        .send({ message: "투표를 위한 토큰이 부족합니다." });
    }

    // 아이돌의 토탈토큰 수 증가
    idol.totalTokens += 1;
    await idol.save();

    res.send({ message: "투표가 성공적으로 완료되었습니다." });
  } catch (error) {
    res.status(500).send({ message: "투표 중 오류가 발생했습니다." });
  }
});

export default router;
