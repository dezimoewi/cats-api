"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCats,
  selectFilteredCats,
  selectIsLoading,
  selectError,
  selectAllCats,
} from "../store/catSlice";
import CatCard from "./CatCard";

const CATS_PER_PAGE = 8;

export default function CatGrid() {
  const dispatch = useAppDispatch();
  const allCats = useAppSelector(selectAllCats);
  const filteredCats = useAppSelector(selectFilteredCats);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const [visibleCount, setVisibleCount] = useState(CATS_PER_PAGE);

  // Fetch cats from API on mount
  useEffect(() => {
    if (allCats.length === 0) {
      dispatch(fetchCats());
    }
  }, [dispatch, allCats.length]);

  const showingFiltered = filteredCats.length < allCats.length;
  const visibleCats = useMemo(
    () => (showingFiltered ? filteredCats : filteredCats.slice(0, visibleCount)),
    [filteredCats, visibleCount, showingFiltered]
  );
  const hasMore = !showingFiltered && visibleCount < filteredCats.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + CATS_PER_PAGE);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
        <span className="ml-3 text-gray-500">Fetching cats from API...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Failed to load cats</h3>
        <p className="mt-1 text-gray-500">{error}</p>
        <button
          onClick={() => dispatch(fetchCats())}
          className="mt-4 rounded-full bg-teal-500 px-6 py-2 text-sm font-medium text-white hover:bg-teal-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredCats.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No cats found</h3>
        <p className="mt-1 text-gray-500">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-sm text-gray-500">
        Show cats
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 rounded-full border-2 border-teal-500 px-6 py-3 text-sm font-medium text-teal-500 transition-colors hover:bg-teal-500 hover:text-white"
          >
            Load More Breeds
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
