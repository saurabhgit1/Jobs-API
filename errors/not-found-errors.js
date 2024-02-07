import CustomErrors from "./custom-errors.js";
import { StatusCodes } from "http-status-codes";

class NotFoundErrors extends CustomErrors {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundErrors;