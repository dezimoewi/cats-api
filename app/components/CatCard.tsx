"use client";

import Image from "next/image";
import Link from "next/link";
import { Cat } from "../types/cat";

interface CatCardProps {
  cat: Cat;
}

export default function CatCard({ cat }: CatCardProps) {
  return (
    <Link
      href={`/cats/${cat.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition"
    >
      <div className="relative w-full h-60">
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold">{cat.name}</h2>

        <p className="text-sm text-gray-600 mt-2">
          {cat.description.slice(0, 80)}...
        </p>

        <div className="mt-4">
          <span className="text-teal-600 text-sm font-medium">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}