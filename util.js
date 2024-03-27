import jwt from "jsonwebtoken"; //npm install jsonwebtoken 이거 해줘야함
import config from "./config";
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      nickname: user.nickname,
      walletAddress: user.walletAddress,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h", //유효시간은 48시간이라는 의미
    }
  );
};

// 이 함수는 사용자의 요청이 인증되었는지 확인하는 역할을 한다.
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not supplied." });
  }
};

export { getToken, isAuth };
