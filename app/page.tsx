import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterChips from "./components/FilterChips";
import CatGrid from "./components/CatGrid";

/**
 * Home Page - Cat Gallery
 *
 * Page Structure:
 * 1. Header - Navigation bar
 * 2. Hero Section - Title and description
 * 3. Search Bar - Filter cats by search query
 * 4. Filter Chips - Quick filter by category
 * 5. Cat Grid - Display filtered cat cards
 *
 * State Management Flow:
 * - ReduxProvider wraps the entire app (in layout.tsx)
 * - SearchBar and FilterChips dispatch Redux actions
 * - CatGrid reads filteredCats from Redux store and renders cards
 * - When a card is clicked, it navigates to /cats/[id] detail page
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Find Your Feline Friend
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
          Browse through hundreds of unique breeds and find the perfect
          companion for your home.
        </p>

        {/* Search Bar */}
        <div className="mt-8">
          <SearchBar />
        </div>

        {/* Filter Chips */}
        <div className="mt-6">
          <FilterChips />
        </div>
      </section>

      {/* Cat Grid Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CatGrid />
      </section>
    </div>
  );
}
