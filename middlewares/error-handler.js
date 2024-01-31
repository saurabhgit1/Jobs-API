import CustomErrors from "../errors/custom-errors.js";
import { StatusCodes } from "http-status-codes";
const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomErrors) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Server Error!!!" });
};

export default errorHandler;
