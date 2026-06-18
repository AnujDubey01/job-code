  import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import LeftSideBar from "./LeftSideBar";
import JobCard from "./JobCard";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { jobs as mockJobs } from "../../../data/jobData";

const Jobs = () => {
  // ── Local state ──
  // useState("") means the initial value of the input is an empty string.
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");

  return (
    // min-h-screen makes the page at least as tall as the viewport
    <div className="min-h-screen bg-gray-50 flex flex-col">


      <Navbar />

      {/*
          HERO HEADER STRIP
      */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Find Your <span className="text-[#6A38C2]">Dream Job</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm mb-6">
            Showing 1,240+ job openings for "Frontend Developer" in Global locations.
          </p>

          {/* ── Search Bar ── */}

          <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm max-w-3xl">

            {/* Keyword input */}
            <div className="flex items-center gap-2 flex-1 px-4 py-3 border-r border-gray-300">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Frontend Developer"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Location input */}
            <div className="flex items-center gap-2 flex-1 px-4 py-3">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Search button */}
            <Button className="rounded-none rounded-r-lg bg-[#6A38C2] hover:bg-[#5930a8] px-6 h-full py-3 text-sm font-semibold">
              Search Jobs
            </Button>

          </div>
        </div>
      </div>

      {/*
          MAIN CONTENT — sidebar + jobs
      */}

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex gap-6 items-start">

          {/* ── LEFT: Filter Sidebar ── */}
          {/* w-64 = 256px fixed width. shrink-0 stops it from squishing. */}
          <div className="w-64 shrink-0">
            <LeftSideBar />
          </div>

          {/* ── RIGHT: Results area ── */}
          <div className="flex-1">

            {/* Result count + Sort dropdown */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{mockJobs.length}</span> results for your search
              </p>

              {/* Sort dropdown — a plain select styled to look clean */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                  >
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Highest Salary</option>
                    <option>Most Relevant</option>
                  </select>
                  {/* Custom dropdown arrow overlaid on the select */}
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ── Job Cards Grid ── */}

            <div className="grid grid-cols-2 gap-4">
              {mockJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* ── Pagination ── */}

            <div className="flex items-center justify-center gap-1 mt-10">

              {/* Previous button */}
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100">
                <ChevronLeft size={14} />
              </button>

              {/* Page numbers */}
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors
                    ${page === 1
                      ? "bg-[#6A38C2] text-white"          // active page
                      : "border border-gray-300 text-gray-600 hover:bg-gray-100"  // inactive
                    }`}
                >
                  {page}
                </button>
              ))}

              {/* Ellipsis */}
              <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>

              {/* Last page */}
              <button className="w-8 h-8 rounded-md border border-gray-300 text-sm text-gray-600 hover:bg-gray-100">
                12
              </button>

              {/* Next button */}
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100">
                <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/*
          NEWSLETTER BANNER
      */}

      <div className="bg-gray-100 border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left: text */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Get personalized job alerts
            </h2>
            <p className="text-sm text-gray-500 max-w-sm">
              Subscribe to our newsletter and never miss an opportunity that matches your skillset.
            </p>
          </div>

          {/* Right: email input + subscribe button */}

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-300 bg-white"
            />
            <Button className="bg-[#6A38C2] hover:bg-[#5930a8] text-white px-5 py-2.5 text-sm font-semibold shrink-0">
              Subscribe
            </Button>
          </div>

        </div>
      </div>

      {/*
          FOOTER — imported, not changed
      */}
      <Footer />

    </div>
  );
};

export default Jobs;
