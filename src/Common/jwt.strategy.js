import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import "dotenv/config";
import jwt from 'jsonwebtoken';

const opt = {
  secretOrKey: process.env.AUTH_HS256_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: `${process.env.AUTH_ISSUER_URL}`,
  algorithms: ["HS256"],
};

const jwtStrategy = new Strategy(opt, (jwt_payload, done) => {
  if (!jwt_payload) {
    done(true);
  } else {
    done(null, jwt_payload);
  }
});

export default jwtStrategy;

export const Authenticate = (req, res, next) => {
  let token = req.headers['authorization']
  token = token.replace("Bearer ", "")
  // console.log(token);

  const isValid = jwt.verify(token, process.env.AUTH_HS256_KEY)
  if(isValid){
    return next()
  }
  return res.status(401).send({ message: 'Unauthorized' });
};
