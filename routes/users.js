const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//Update

router.put("/:id", verify, async (req, res) => {
  //verify는 미들웨어 함수로 요청 처리 하기전에 확인
  if (req.user.id == req.params.id || req.user.isAdmin) {
    // 요청을 보낸 사용자의 아이디가 url 경로에서 받은 id와 같은지, 사용자가 관리자 인지 확인
    if (req.body.password) {
      // req.body 요청 본문에 password가 존재하는지 확인
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ); // req.params.id는 업데이트 할 문서의 번호, $set:req.body는 바꿀 것, new:true는 바꾼 것을 리턴
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can update only your account");
  }
});
