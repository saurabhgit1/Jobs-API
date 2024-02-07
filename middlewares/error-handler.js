import CustomErrors from "../errors/custom-errors.js";
import { StatusCodes } from "http-status-codes";
const errorHandler = (error, req, res, next) => {
  const customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Something Went Wrong!!!",
  };
  // if (error instanceof CustomErrors) {
  //   return res.status(error.statusCode).json({ message: error.message });
  // }
  if (error.code && error.code === 11000) {
    customError.msg =
      "Duplicate value entered for " +
      Object.keys(error.keyValue) +
      " Please choose another value.";
    customError.statusCode = 400;
  }
  if (error.name === "ValidatonError") {
    customError.msg = Object.values(error.errors)
      .map((item) => item.messgage)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandler;
