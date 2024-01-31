import express from "express";
import { jobsGetController } from "../controllers/jobs.js";
import checkAuth from "../middlewares/auth.js";

const router = express.Router();

router.route("/jobs").get(checkAuth, jobsGetController);

export default router;
