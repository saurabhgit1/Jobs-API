import CustomErrors from "./custom-errors.js";
import { StatusCodes } from "http-status-codes";
class AuthErrors extends CustomErrors {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export default AuthErrors;
