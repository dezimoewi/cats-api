import { Cat, CatBreedApiResponse } from "../types/cat";

const API_KEY = "live_UzpHgxr6Pje7CenBnW43CiLa7rlgWcFbAo2BtifnU5rmGWyTUENm8VctVLGIM8pg";
const BASE_URL = "https://api.thecatapi.com/v1";

/**
 * Transform API response to our Cat type
 */
function transformCatData(apiCat: CatBreedApiResponse): Cat {
  const temperamentArray = apiCat.temperament
    ? apiCat.temperament.split(", ").map((t) => t.trim())
    : [];

  return {
    id: apiCat.id,
    name: apiCat.name,
    breed: apiCat.name,
    origin: apiCat.origin || "Unknown",
    description: apiCat.description || "No description available.",
    temperament: temperamentArray,
    lifeSpan: apiCat.life_span ? `${apiCat.life_span} yrs` : "Unknown",
    weight: apiCat.weight?.imperial ? `${apiCat.weight.imperial} lbs` : "Unknown",
    image: apiCat.image?.url || `https://cdn2.thecatapi.com/images/${apiCat.reference_image_id}.jpg`,
    characteristics: {
      playful: apiCat.energy_level || 3,
      indoor: apiCat.indoor || 3,
      calm: 6 - (apiCat.energy_level || 3), // Inverse of energy
      affectionate: apiCat.affection_level || 3,
      intelligent: apiCat.intelligence || 3,
    },
    wikipediaUrl: apiCat.wikipedia_url,
    hairless: apiCat.hairless === 1,
    shedding: apiCat.shedding_level || 2,
  };
}

/**
 * Fetch all cat breeds from The Cat API
 */
export async function fetchCatBreeds(): Promise<Cat[]> {
  const response = await fetch(`${BASE_URL}/breeds`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cat breeds: ${response.statusText}`);
  }

  const data: CatBreedApiResponse[] = await response.json();
  return data.map(transformCatData);
}

/**
 * Fetch a single cat breed by ID
 */
export async function fetchCatById(id: string): Promise<Cat | null> {
  const response = await fetch(`${BASE_URL}/breeds/${id}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch cat: ${response.statusText}`);
  }

  const data: CatBreedApiResponse = await response.json();
  return transformCatData(data);
}

/**
 * Search cat breeds by name
 */
export async function searchCatBreeds(query: string): Promise<Cat[]> {
  const response = await fetch(`${BASE_URL}/breeds/search?q=${encodeURIComponent(query)}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to search cats: ${response.statusText}`);
  }

  const data: CatBreedApiResponse[] = await response.json();
  return data.map(transformCatData);
}
