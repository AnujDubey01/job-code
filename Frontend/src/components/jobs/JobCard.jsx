const JobCard = ({ job }) => {
  return (
    <div className="border rounded-xl p-5">

      <h3 className="text-sm text-gray-500">
        {job.company}
      </h3>

      <h2 className="font-bold text-lg mt-2">
        {job.title}
      </h2>

      <p className="text-sm text-gray-600">
        {job.location}
      </p>

      <p className="text-sm mt-3 text-gray-500">
        {job.description}
      </p>

      <div className="flex gap-2 mt-4">

        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
          {job.type}
        </span>

        <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
          {job.salary}
        </span>

        <span className="bg-gray-100 px-2 py-1 rounded">
          {job.mode}
        </span>

      </div>

      <button
        className="
        mt-5
        w-full
        border
        border-purple-600
        text-purple-600
        rounded-lg
        py-2
        "
      >
        Apply Now
      </button>

    </div>
  );
};

export default JobCard;