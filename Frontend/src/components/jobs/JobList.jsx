import JobCard from "./JobCard";
import { jobs } from "../../../data/jobData";

const JobList = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
