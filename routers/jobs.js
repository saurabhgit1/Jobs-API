import express from "express";
import { jobsGetController } from "../controllers/jobs.js";

const router = express.Router();

router.route("/jobs").get(jobsGetController);

export default router;