import React from "react";

const jobTypes = [
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
];

const salaryRanges = [
  "$50K - $80K",
  "$80K - $120K",
  "$120K - $180K",
  "$200K+",
];

const experienceLevels = [
  "Entry Level",
  "Intermediate",
  "Expert / Senior",
];

const LeftSideBar = () => {
  return (
    <div className="border rounded-xl p-5 bg-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg">Filters</h2>
        <button className="text-sm text-purple-600 hover:text-purple-700">
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">JOB TYPE</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="mb-6">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">SALARY RANGE</h3>
        <div className="space-y-2">
          {salaryRanges.map((salary) => (
            <label key={salary} className="flex items-center gap-2 text-sm">
              <input type="radio" name="salary" />
              {salary}
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-semibold text-sm text-gray-700 mb-3">EXPERIENCE</h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              {level}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LeftSideBar;
