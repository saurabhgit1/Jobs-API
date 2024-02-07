import { StatusCodes } from "http-status-codes";
import Job from "../models/Jobs.js";
import BadRequestErrors from "../errors/bad-request-errors.js";
import NotFoundErrors from "../errors/not-found-errors.js";

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  } catch (error) {
    next(error);
  }
};
const getJob = async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
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
const updateJob = async (req, res, next) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req;
    if (!company || !position) {
      throw new BadRequestErrors("Company, position can't be empty");
    }
    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      {
        company: company,
        position: position,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!job) {
      throw new NotFoundErrors("Job not found with given id.");
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (error) {
    next(error);
  }
};
const deleteJob = async (req, res, next) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundErrors("Job not found with given id.");
    }
    res.status(StatusCodes.OK).send();
  } catch (error) {
    next(error);
  }
};
export { getAllJobs, getJob, createJob, updateJob, deleteJob };
