  import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import LeftSideBar from "./LeftSideBar";
import JobCard from "./JobCard";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { jobs as mockJobs } from "../../../data/jobData";

// How many job cards to show per page — change this one number to adjust
const JOBS_PER_PAGE = 9;

const parseSalaryRange = (salary) => {
  const numbers = salary.match(/\d+/g)?.map(Number);
  if (!numbers?.length) return null;
  return {
    min: numbers[0],
    max: numbers.length > 1 ? numbers[1] : numbers[0],
  };
};

const salariesOverlap = (jobSalary, filterSalary) => {
  if (!filterSalary) return true;
  const jobRange = parseSalaryRange(jobSalary);
  const filterRange = parseSalaryRange(filterSalary);
  if (!jobRange || !filterRange) return true;
  return jobRange.max >= filterRange.min && jobRange.min <= filterRange.max;
};

const getSalaryScore = (salary) => {
  const range = parseSalaryRange(salary);
  if (!range) return 0;
  return (range.min + range.max) / 2;
};

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keywordInput, setKeywordInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState("");
  const [selectedExp, setSelectedExp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const queryKeyword = searchParams.get("keyword") ?? "";
    const queryLocation = searchParams.get("location") ?? "";
    setKeyword(queryKeyword);
    setKeywordInput(queryKeyword);
    setLocation(queryLocation);
    setLocationInput(queryLocation);
  }, [searchParams]);

  const toggleSelection = (values, value) =>
    values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedKeyword = keywordInput.trim();
    const trimmedLocation = locationInput.trim();
    setKeyword(trimmedKeyword);
    setLocation(trimmedLocation);
    const params = {};
    if (trimmedKeyword) params.keyword = trimmedKeyword;
    if (trimmedLocation) params.location = trimmedLocation;
    setSearchParams(params);
  };

  const filteredJobs = useMemo(() => {
    const matchesFilters = (job) => {
      const keywordMatch =
        !keyword ||
        [job.title, job.company, job.description].some((value) =>
          value.toLowerCase().includes(keyword.toLowerCase())
        );
      const locationMatch = !location || job.location.toLowerCase().includes(location.toLowerCase());
      const typeMatch = !selectedTypes.length || selectedTypes.includes(job.type);
      const salaryMatch = salariesOverlap(job.salary, selectedSalary);
      const expMatch = !selectedExp.length || selectedExp.includes(job.experience);
      return keywordMatch && locationMatch && typeMatch && salaryMatch && expMatch;
    };

    const sorted = [...mockJobs].filter(matchesFilters);

    if (sortBy === "Oldest First") {
      return sorted.sort((a, b) => a.id - b.id);
    }
    if (sortBy === "Highest Salary") {
      return sorted.sort((a, b) => getSalaryScore(b.salary) - getSalaryScore(a.salary));
    }
    if (sortBy === "Most Relevant") {
      if (!keyword) return sorted.sort((a, b) => b.id - a.id);
      return sorted.sort((a, b) => {
        const score = (item) =>
          [item.title, item.company, item.description].reduce(
            (sum, value) => sum + (value.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0),
            0
          );
        return score(b) - score(a) || b.id - a.id;
      });
    }
    return sorted.sort((a, b) => b.id - a.id);
  }, [keyword, location, selectedTypes, selectedSalary, selectedExp, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE));
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, location, selectedTypes, selectedSalary, selectedExp, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

          <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm max-w-3xl">

            {/* Keyword input */}
            <div className="flex items-center gap-2 flex-1 px-4 py-3 border-r border-gray-300">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Frontend Developer"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Location input */}
            <div className="flex items-center gap-2 flex-1 px-4 py-3">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Remote"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Search button */}
            <Button type="submit" className="rounded-none rounded-r-lg bg-[#6A38C2] hover:bg-[#5930a8] px-6 h-full py-3 text-sm font-semibold">
              Search Jobs
            </Button>

          </form>
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
            <LeftSideBar
              selectedTypes={selectedTypes}
              selectedSalary={selectedSalary}
              selectedExp={selectedExp}
              onToggleType={(type) => setSelectedTypes((prev) => toggleSelection(prev, type))}
              onSelectSalary={(salary) => setSelectedSalary((prev) => (prev === salary ? "" : salary))}
              onToggleExp={(level) => setSelectedExp((prev) => toggleSelection(prev, level))}
              clearAll={() => {
                setSelectedTypes([]);
                setSelectedSalary("");
                setSelectedExp([]);
              }}
            />
          </div>

          {/* ── RIGHT: Results area ── */}
          <div className="flex-1">

            {/* Result count + Sort dropdown */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  {filteredJobs.length === 0 ? 0 : startIndex + 1}–{Math.min(endIndex, filteredJobs.length)}
                </span>{" "}
                of <span className="font-semibold">{filteredJobs.length}</span> results
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
            {/* currentJobs is the sliced array for the current page only */}
            <div className="grid grid-cols-3 gap-4">
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* ── Pagination ── */}
            {/*
              totalPages is calculated from the data length.
              Array.from({ length: totalPages }) creates an array we can map over.
              e.g. totalPages=2 → [1, 2]
            */}
            <div className="flex items-center justify-center gap-1 mt-10">

              {/* Previous button — disabled on page 1 */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Dynamic page number buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors
                    ${page === currentPage
                      ? "bg-[#6A38C2] text-white"                            // active
                      : "border border-gray-300 text-gray-600 hover:bg-gray-100"  // inactive
                    }`}
                >
                  {page}
                </button>
              ))}

              {/* Next button — disabled on last page */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
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
