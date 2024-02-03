import BadRequestErrors from "../errors/bad-request-errors.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

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

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

const login = (req, res) => {
  res.send("login controller");
};

export { register, login };
