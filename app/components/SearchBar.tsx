"use client";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearchQuery, selectSearchQuery } from "../store/catSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for cats by breed, color, or personality..."
          className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
    </div>
  );
}
