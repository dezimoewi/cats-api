import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Cat, FilterType } from "../types/cat";
import { fetchCatBreeds } from "../services/catApi";

interface CatState {
  cats: Cat[];
  filteredCats: Cat[];
  searchQuery: string;
  activeFilter: FilterType;
  isLoading: boolean;
  error: string | null;
}

const initialState: CatState = {
  cats: [],
  filteredCats: [],
  searchQuery: "",
  activeFilter: "all",
  isLoading: false,
  error: null,
};

export const fetchCats = createAsyncThunk(
  "cats/fetchCats",
  async (_, { rejectWithValue }) => {
    try {
      const cats = await fetchCatBreeds();
      return cats;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch cats"
      );
    }
  }
);

// Helper function to filter cats
const filterCats = (
  cats: Cat[],
  searchQuery: string,
  activeFilter: FilterType
): Cat[] => {
  let result = cats;

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.breed.toLowerCase().includes(query) ||
        cat.temperament.some((t) => t.toLowerCase().includes(query)) ||
        cat.description.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (activeFilter !== "all") {
    result = result.filter((cat) => {
      switch (activeFilter) {
        case "playful":
          return cat.characteristics.playful >= 4;
        case "longHair":
          return cat.shedding >= 3 && !cat.hairless;
        case "indoor":
          return cat.characteristics.indoor >= 4;
        case "calm":
          return cat.characteristics.calm >= 4;
        default:
          return true;
      }
    });
  }

  return result;
};

const catSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    setCats: (state, action: PayloadAction<Cat[]>) => {
      state.cats = action.payload;
      state.filteredCats = filterCats(
        action.payload,
        state.searchQuery,
        state.activeFilter
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredCats = filterCats(
        state.cats,
        action.payload,
        state.activeFilter
      );
    },
    setActiveFilter: (state, action: PayloadAction<FilterType>) => {
      state.activeFilter = action.payload;
      state.filteredCats = filterCats(
        state.cats,
        state.searchQuery,
        action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cats = action.payload;
        state.filteredCats = filterCats(
          action.payload,
          state.searchQuery,
          state.activeFilter
        );
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCats, setSearchQuery, setActiveFilter, setLoading, setError } =
  catSlice.actions;

export default catSlice.reducer;

// Selectors
export const selectAllCats = (state: { cats: CatState }) => state.cats.cats;
export const selectFilteredCats = (state: { cats: CatState }) =>
  state.cats.filteredCats;
export const selectSearchQuery = (state: { cats: CatState }) =>
  state.cats.searchQuery;
export const selectActiveFilter = (state: { cats: CatState }) =>
  state.cats.activeFilter;
export const selectIsLoading = (state: { cats: CatState }) =>
  state.cats.isLoading;
export const selectError = (state: { cats: CatState }) => state.cats.error;

export const selectCatById = (state: { cats: CatState }, id: string) =>
  state.cats.cats.find((cat) => cat.id === id);

export const selectSimilarCats = (
  state: { cats: CatState },
  cat: Cat,
  limit: number = 4
) => {
  return state.cats.cats
    .filter((c) => c.id !== cat.id)
    .filter(
      (c) =>
        c.temperament.some((t) => cat.temperament.includes(t)) ||
        c.origin === cat.origin
    )
    .slice(0, limit);
};
