"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchCats,
  selectCatById,
  selectSimilarCats,
  selectAllCats,
  selectIsLoading,
} from "../../store/catSlice";

interface CatDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Cat Detail Page
 *
 * Dynamic route that displays detailed information about a specific cat
 *
 * Page Structure:
 * 1. Breadcrumb navigation
 * 2. Main content with cat image and details
 * 3. Similar cats section
 *
 * State Management:
 * - Uses Redux selectors to fetch the specific cat
 * - Uses selectSimilarCats to find related cats for recommendations
 */
export default function CatDetailPage({ params }: CatDetailPageProps) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  const allCats = useAppSelector(selectAllCats);
  const isLoading = useAppSelector(selectIsLoading);

  // Fetch cats from API if not already loaded
  useEffect(() => {
    if (allCats.length === 0) {
      dispatch(fetchCats());
    }
  }, [dispatch, allCats.length]);

  const cat = useAppSelector((state) => selectCatById(state, id));
  const similarCats = useAppSelector((state) =>
    cat ? selectSimilarCats(state, cat, 4) : []
  );

  // Show loading while fetching
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
        <span className="ml-3 text-gray-500">Loading cat details...</span>
      </div>
    );
  }

  // If cat not found after loading, show 404
  if (!cat && allCats.length > 0) {
    notFound();
  }

  // Still loading initial data
  if (!cat) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              CatFinder
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Gallery
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Breeds
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              About
            </Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search breeds..."
                className="w-48 rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <button className="text-gray-600 hover:text-teal-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
            <div className="h-9 w-9 overflow-hidden rounded-full bg-orange-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-gray-900">
              Cat Gallery
            </Link>
            <span>/</span>
            <span className="text-gray-900">{cat.name} Details</span>
          </nav>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
          >
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to Gallery
          </Link>
        </div>

        {/* Cat Details Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Cat Image */}
            <div className="relative aspect-square lg:aspect-auto lg:h-full">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Favorite Button */}
              <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>

            {/* Cat Information */}
            <div className="p-6 lg:p-8">
              {/* Tags */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
                  BREED INFORMATION
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  📍 Origin: {cat.origin}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                {cat.name}
              </h1>

              {/* Quote */}
              <blockquote className="mt-4 border-l-4 border-teal-500 pl-4 italic text-gray-600">
                &ldquo;{cat.description.split(".")[0]}.&rdquo;
              </blockquote>

              {/* Stats Grid */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className="text-xs font-medium uppercase text-gray-500">
                    Age
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    Adult
                  </div>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className="text-xs font-medium uppercase text-gray-500">
                    Weight
                  </div>
                  <div className="mt-1 text-lg font-semibold text-teal-600">
                    {cat.weight}
                  </div>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className="text-xs font-medium uppercase text-gray-500">
                    Life Span
                  </div>
                  <div className="mt-1 text-lg font-semibold text-teal-600">
                    {cat.lifeSpan}
                  </div>
                </div>
              </div>              

              {/* Description */}
              <div className="mt-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase text-gray-500">
                  <span>📖</span> Description
                </h2>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {cat.description}
                </p>
              </div>

              {/* Share & Find Breeders */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Share Options */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Share this cat:</span>
                  <div className="flex gap-2">
                    {["share", "email", "pinterest", "link"].map((icon) => (
                      <button
                        key={icon}
                        className="rounded-full bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200"
                      >
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
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Find Breeders Button */}
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  Find Breeders Near Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cats Section */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Similar Cats</h2>
              <p className="mt-1 text-gray-500">
                You might also fall in love with these breeds
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              View all breeds →
            </Link>
          </div>

          {/* Similar Cats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {similarCats.map((similarCat) => (
              <Link
                key={similarCat.id}
                href={`/cats/${similarCat.id}`}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={similarCat.image}
                    alt={similarCat.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900">
                    {similarCat.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {similarCat.temperament.slice(0, 2).join(" & ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
