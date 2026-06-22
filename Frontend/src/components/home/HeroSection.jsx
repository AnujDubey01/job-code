import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    navigate(trimmedQuery ? `/jobs?keyword=${encodeURIComponent(trimmedQuery)}` : "/jobs");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-18">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search , Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
          laboriosam veritatis corrupti at, molestias iste.
        </p>
        <form
          onSubmit={handleSearch}
          className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto"
        >
          <input
            type="text"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button type="submit" className="rounded-r-full bg-[#6A38C2] hover:bg-black cursor-pointer text-white">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;