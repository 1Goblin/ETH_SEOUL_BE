import express from "express";
import User from "../models/User";
import Idol from "../models/Idol";
import { getToken, isAuth } from "../util";

const router = express.Router();

// 사용자 로그인
router.post("/login", async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await User.findOne({ walletAddress });
    if (!user) {
      // 사용자가 존재하지 않을 경우, 클라이언트에게 리다이렉트 URL을 제공
      return res.status(401).send({ redirectTo: "/register" });
    }
    res.send({
      //닉네임와 지갑주소를 응답
      _id: user.id,
      nickname: user.nickname,
      walletAddress: user.walletAddress,
      token: getToken(user),
    });
  } catch (error) {
    res.status(500).send({ message: "로그인 중 오류가 발생했습니다." });
  }
});

// 사용자 회원가입
router.post("/register", async (req, res) => {
  try {
    const { nickname, walletAddress } = req.body; //닉네임과 월렛키를 받아옴
    // 이미 존재하는 닉네임인지 확인
    const existingUser = await User.findOne({ nickname }); //findOne()함수로 해당nickname인 유저전체 정보를 가져옴
    if (existingUser) {
      // 닉네임이 기존에 존재한다면 거절
      return res.status(400).send({ message: "이미 사용 중인 닉네임입니다." });
    }
    const user = new User({ nickname, walletAddress });
    const newUser = await user.save(); //save()는 몽고디비 모델의 메서드로 이함수쓰면 몽고디비에 저장된다함.
    res.send({
      //닉네임와 지갑주소를 응답
      _id: newUser.id,
      nickname: newUser.nickname,
      walletAddress: newUser.walletAddress,
      token: getToken(newUser),
    });
  } catch (error) {
    res.status(500).send({ message: "회원가입 중 오류가 발생했습니다." });
  }
});

// 관심 아이돌 추가하기
router.post("/idolProfile/:idolId", isAuth, async (req, res) => {
  //:idolId는 변수임 아이돌마다 다른페이지
  try {
    const { idolId } = req.params; //req.params는 idolId 매개변수를 추출하는 것을 의미한다. /idolProfile/(idolId)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: "사용자를 찾을 수 없습니다." });
    }
    // 이미 관심 아이돌로 추가한 아이돌인지 확인
    if (user.interestedIdols.includes(idolId)) {
      return res
        .status(400)
        .send({ message: "이미 관심 아이돌로 추가한 아이돌입니다." });
    }
    user.interestedIdols.push(idolId); //user.intersetedIdols의 name은 받아오지 못하는 상태 나중에 확인해야함
    await user.save();
    res.send({ message: "관심 아이돌로 추가되었습니다." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "관심 아이돌 추가 중 오류가 발생했습니다." });
  }
});

export default router;
