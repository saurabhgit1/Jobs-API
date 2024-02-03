import AuthErrors from "../errors/auth-errors.js";
import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AuthErrors("Token Not Present");
    }
    const token = authorization.split(" ")[0];
    const decode = jwt.verify(token, process.env.SECRET_TEXT);
    next();
  } catch (error) {
    // console.error(error);
    throw new AuthErrors("Invalid token");
  }
};

export default checkAuth;
