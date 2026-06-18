import React from "react";
import { MapPin, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// JobCard receives a single `job` object as a prop and renders one card.
// Each card shows: company logo area, bookmark, company name, title,
// location, description snippet, tags, and an Apply Now button.

const JobCard = ({ job }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">

      {/* ── Top Row: company logo + bookmark icon ── */}
      <div className="flex items-start justify-between mb-3">

        {/* Company logo placeholder — a small rounded square with initials */}
        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
          {/* We grab the first letter of the company name */}
          {job.company?.charAt(0) ?? "C"}
        </div>

        {/* Bookmark icon — top-right corner */}
        <button className="text-gray-400 hover:text-purple-600 transition-colors">
          <Bookmark size={18} />
        </button>
      </div>

      {/* ── Company name ── */}
      <p className="text-sm text-gray-500 mb-1">{job.company}</p>

      {/* ── Job title ── */}
      <h2 className="font-bold text-base text-gray-900 mb-1">{job.title}</h2>

      {/* ── Location with pin icon ── */}
      <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
        <MapPin size={13} />
        <span>{job.location}</span>
      </div>

      {/* ── Description snippet ── */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {job.description ?? "No description provided."}
      </p>

      {/* ── Tags: job type, salary, mode ── */}
      {/* 
        Badge is a shadcn component. We pass `variant="secondary"` 
        for a subtle background, then override color with className.
        line-clamp-2 cuts the description to 2 lines with "..." 
      */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.type && (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 font-medium text-xs">
            {job.type}
          </Badge>
        )}
        {job.salary && (
          <Badge className="bg-red-100 text-red-600 hover:bg-red-100 font-medium text-xs">
            {job.salary}
          </Badge>
        )}
        {job.mode && (
          <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 font-medium text-xs">
            {job.mode}
          </Badge>
        )}
      </div>

      {/* ── Apply Now button ── */}
      {/* 
        variant="outline" gives a border-only button.
        We override with purple border + text, and full width.
      */}
      <Button
        variant="outline"
        className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
      >
        Apply Now
      </Button>

    </div>
  );
};

export default JobCard;
