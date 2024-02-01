const getAllJobs = (req, res) => {
  res.send("get all jobs controller");
};
const getJobs = (req, res) => {
  res.send("get jobs controller");
};
const createJob = (req, res) => {
  res.send("create job controller");
};
const updateJob = (req, res) => {
  res.send("update job controller");
};
const deleteJob = (req, res) => {
  res.send("delete job controller");
};
export { getAllJobs, getJobs, createJob, updateJob, deleteJob };
