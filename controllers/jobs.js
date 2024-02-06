import { StatusCodes } from "http-status-codes";
import Job from "../models/Jobs.js";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  } catch (error) {
    next(error);
  }
};
const getJob = async (req, res) => {
  try {
    //nested destructuring
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (job) {
      res.status(StatusCodes.OK).json({ job });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "job not present" });
    }
  } catch (error) {}
};
const createJob = async (req, res, next) => {
  try {
    // const { company, position } = req.body;
    // const createdBy = req.user.userId;
    req.body.createdBy = req.user.userId;
    // const job = await Job.create({ company, position,createdBy });
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    next(error);
  }
};
const updateJob = (req, res) => {
  res.send("update job controller");
};
const deleteJob = (req, res) => {
  res.send("delete job controller");
};
export { getAllJobs, getJob, createJob, updateJob, deleteJob };
