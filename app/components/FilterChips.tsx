"use client";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setActiveFilter, selectActiveFilter } from "../store/catSlice";
import { FilterType } from "../types/cat";

const filters: { id: FilterType; label: string; icon: string }[] = [
  { id: "all", label: "All Cats", icon: "🐱" },
  { id: "playful", label: "Playful", icon: "🎾" },
  { id: "longHair", label: "Long Hair", icon: "🦁" },
  { id: "indoor", label: "Indoor", icon: "🏠" },
  { id: "calm", label: "Calm", icon: "😴" },
];

export default function FilterChips() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(selectActiveFilter);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => dispatch(setActiveFilter(filter.id))}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? "bg-teal-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {filter.icon}
          {filter.label}
        </button>
      ))}
    </div>
  );
}

