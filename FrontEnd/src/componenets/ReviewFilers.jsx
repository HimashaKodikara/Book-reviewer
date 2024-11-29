import React from 'react';
import { ArrowUpDown, Search } from 'lucide-react';

export function ReviewFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
}) {
  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-4 md:flex-row">
      
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search reviews by title..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <Search
            className="absolute text-gray-400 transform -translate-y-1/2 top-1/2 left-3"
            size={18}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="date">Date</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
          <button
            onClick={onSortDirectionChange}
            className="p-2 rounded-md hover:bg-gray-100"
            title={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
          >
            <ArrowUpDown
              size={20}
              className={`transform ${
                sortDirection === 'desc' ? 'rotate-180' : ''
              } transition-transform`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}