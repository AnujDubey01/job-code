import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { Search, ChevronDown } from 'lucide-react'
import BrowseCards from './BrowseCards'
import { companies } from '../../../data/companyData'

const categories = ["Technology", "Finance", "Healthcare"]
const INITIAL_COUNT = 6

const Browse = () => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const filtered = companies.filter((c) => {
    const matchesCategory = activeCategory ? c.category === activeCategory : true
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const visibleCompanies = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="min-h-screen bg-[#f3f2f8] flex flex-col">

      <Navbar />

      <div className="flex flex-col items-center text-center py-16 px-6">

        <span className="bg-purple-100 text-purple-700 text-sm font-medium px-5 py-1.5 rounded-full mb-6">
          Explore Industry Leaders
        </span>

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Browse Top <span className="text-[#6A38C2]">Companies</span>
        </h1>

        <div className="border border-dashed border-purple-300 rounded-lg px-8 py-4 max-w-lg mb-10">
          <p className="text-gray-500 text-sm leading-relaxed">
            Discover your next career move by exploring the most innovative
            organizations. Read about their culture, benefits, and open
            opportunities.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm w-72">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search company by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setVisibleCount(INITIAL_COUNT)
              }}
              className="outline-none text-sm w-full text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(activeCategory === cat ? null : cat)
                setVisibleCount(INITIAL_COUNT)
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors
                ${activeCategory === cat
                  ? "bg-[#6A38C2] text-white border-[#6A38C2]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:text-purple-600"
                }`}
            >
              {cat}
            </button>
          ))}

        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="max-w-6xl mx-auto w-full px-6 pb-10">

        {visibleCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCompanies.map((company) => (
              <BrowseCards key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-20">No companies found.</p>
        )}

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-3 rounded-full text-sm transition-colors"
            >
              Load More Companies
              <ChevronDown size={16} />
            </button>
          </div>
        )}

      </div>

      <div className="flex-1" />
      <Footer />
    </div>
  )
}

export default Browse
