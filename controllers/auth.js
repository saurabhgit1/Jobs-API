import AuthErrors from "../errors/auth-errors.js";
import BadRequestErrors from "../errors/bad-request-errors.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
const register = async (req, res, next) => {
  try {
    // below validation is optional as we have put validation in mongoose schema as well.
    // const { email, name, password } = req.body;
    // if (!email || !name || !password) {
    //   throw new BadRequestErrors("Please provid email, name and password.");
    // }

    // below hashing of password should be moved to middleware (at mongoose schema)
    const { email, name, password } = req.body;

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // const user = await User.create({ ...req.body });
    const user = await User.create({ email, name, password });

    //token creation
    // const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
    //   expiresIn: "30d",
    // });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestErrors("Please provide email and password both.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthErrors("Invalid credentials");
    }
    const isPwdCorrect = await user.matchPassword(password);
    if (!isPwdCorrect) {
      throw new AuthErrors("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

export { register, login };
