import React, { useState } from "react";

// ── Static filter data defined inside the component ──
// In a real app these might come from an API, but for now we hardcode them.

const jobTypes = ["Full Time", "Part Time", "Contract", "Internship"];
const salaryRanges = ["$50k - $80k", "$80k - $120k", "$120k - $180k", "$200k+"];
const experienceLevels = ["Entry Level", "Intermediate", "Expert / Senior"];

const LeftSideBar = () => {
  // useState lets us track which checkboxes / radio are selected.
  // selectedTypes is an array of checked job types, e.g. ["Full Time"]
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState("");
  const [selectedExp, setSelectedExp] = useState([]);

  // Toggle a value in an array: if it's already there, remove it; otherwise add it.
  const toggle = (arr, setArr, value) => {
    setArr(
      arr.includes(value)
        ? arr.filter((v) => v !== value)   // remove
        : [...arr, value]                  // add
    );
  };

  // Clear all filters back to defaults
  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedSalary("");
    setSelectedExp([]);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white sticky top-4">

      {/* ── Header row ── */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-base text-gray-900">Filters</h2>
        <button
          onClick={clearAll}
          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* ── JOB TYPE section ── */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-3">
          JOB TYPE
        </h3>
        <div className="space-y-2.5">
          {jobTypes.map((type) => (
            // Each label wraps both the checkbox and text so clicking the
            // text also toggles the checkbox — better UX!
            <label key={type} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggle(selectedTypes, setSelectedTypes, type)}
                // accent-purple-600 colours the checkbox purple in modern browsers
                className="accent-purple-600 w-4 h-4"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* ── SALARY RANGE section ── */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-3">
          SALARY RANGE
        </h3>
        <div className="space-y-2.5">
          {salaryRanges.map((salary) => (
            <label key={salary} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
              {/* Radio buttons — only one salary range can be picked at a time */}
              <input
                type="radio"
                name="salary"
                value={salary}
                checked={selectedSalary === salary}
                onChange={() => setSelectedSalary(salary)}
                className="accent-purple-600 w-4 h-4"
              />
              {salary}
            </label>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCE section ── */}
      <div>
        <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-3">
          EXPERIENCE
        </h3>
        <div className="space-y-2.5">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedExp.includes(level)}
                onChange={() => toggle(selectedExp, setSelectedExp, level)}
                className="accent-purple-600 w-4 h-4"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LeftSideBar;
