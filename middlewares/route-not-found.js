import { StatusCodes } from "http-status-codes";

const routeNotFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ msg: "route Not Found" });
};

export default routeNotFound;
