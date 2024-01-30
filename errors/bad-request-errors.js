import CustomErrors from "./custom-errors.js";
import { StatusCodes } from "http-status-codes";

class BadRequestErrors extends CustomErrors {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestErrors;