import express from "express";
import dotenv from "dotenv";
dotenv.config();
// import expessasyncerrors from "express-async-errors";
import jobsRoutes from "./routers/jobs.js";
import authRoutes from "./routers/auth.js";
import routeNotFoundMW from "./middlewares/route-not-found.js";
import errorHandlerMW from "./middlewares/error-handler.js";
import connectToDB from "./db/connectdb.js";
import checkAuth from "./middlewares/auth.js";

//extra security pkgs
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 60 }));

app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", checkAuth, jobsRoutes);

app.use(routeNotFoundMW);
app.use(errorHandlerMW);

const start = async () => {
  try {
    // await connectToDB(process.env.MONGO_URI);
    await connectToDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log("server started at" + process.env.PORT);
    });
  } catch (error) {
    console.error("start log", error);
  }
};
start();
