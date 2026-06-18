import React from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import JobList from "./JobList";
import LeftSideBar from "./LeftSideBar";

const Jobs = () => {
  return (
    <>
      <Navbar />

      {/* Search Section */}

      <div className="max-w-7xl mx-auto px-4">Search Bar Here</div>

      {/* Content Section */}

      <div className="flex gap-5 mt-6">
        
        <div className="w-1/4">
          <LeftSideBar />
        </div>

        <div className="w-3/4">
          <JobList />
        </div>

      </div>
    </>
  );
};
export default Jobs;