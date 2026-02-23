// Cat type definitions for the application

// Raw API response from The Cat API
export interface CatBreedApiResponse {
  id: string;
  name: string;
  origin: string;
  description: string;
  temperament: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  wikipedia_url?: string;
  // Characteristic ratings (1-5 scale)
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  energy_level: number;
  grooming: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  vocalisation: number;
  hairless: number;
  indoor: number;
  lap: number;
  reference_image_id?: string;
  image?: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
}

// Normalized cat type for our application
export interface Cat {
  id: string;
  name: string;
  breed: string;
  origin: string;
  description: string;
  temperament: string[];
  lifeSpan: string;
  weight: string;
  image: string;
  characteristics: {
    playful: number;
    indoor: number;
    calm: number;
    affectionate: number;
    intelligent: number;
  };
  wikipediaUrl?: string;
  hairless: boolean;
  shedding: number;
}

export type FilterType = "all" | "playful" | "longHair" | "indoor" | "calm";

export interface CatState {
  cats: Cat[];
  filteredCats: Cat[];
  searchQuery: string;
  activeFilter: FilterType;
  isLoading: boolean;
  error: string | null;
}

export interface CatContextType extends CatState {
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: FilterType) => void;
  getCatById: (id: string) => Cat | undefined;
  getSimilarCats: (cat: Cat, limit?: number) => Cat[];
  refetch: () => Promise<void>;
}
