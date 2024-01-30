import CustomErrors from "./custom-errors.js";
import { StatusCodes } from "http-status-codes";
class AuthErrors extends CustomErrors {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}
export default AuthErrors;
