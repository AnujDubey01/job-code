import React from 'react'
import { Building2 } from 'lucide-react'

const BrowseCards = ({ company }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col gap-4">

      {/* Top row: logo + openings badge */}
      <div className="flex items-start justify-between">

        {/* Company logo placeholder */}
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
          <Building2 size={24} />
        </div>

        {/* Openings badge — purple pill */}
        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full tracking-wide uppercase">
          {company.openings} Openings
        </span>

      </div>

      {/* Company name */}
      <h2 className="text-lg font-bold text-gray-900">{company.name}</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed flex-1">
        {company.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {company.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  )
}

export default BrowseCards
