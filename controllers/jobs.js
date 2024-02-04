import { StatusCodes } from "http-status-codes";
import Job from "../models/Jobs.js";

const getAllJobs = (req, res) => {
  res.send("get all jobs controller");
};
const getJobs = (req, res) => {
  res.send("get jobs controller");
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
export { getAllJobs, getJobs, createJob, updateJob, deleteJob };
