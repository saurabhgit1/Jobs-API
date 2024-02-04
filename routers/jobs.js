import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobs,
  updateJob,
} from "../controllers/jobs.js";
import checkAuth from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJobs).patch(updateJob).delete(deleteJob);

export default router;
