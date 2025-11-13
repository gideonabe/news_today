import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  debouncedQuery: string;
}

const initialState: SearchState = {
  query: '',
  debouncedQuery: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setDebouncedQuery: (state, action: PayloadAction<string>) => {
      state.debouncedQuery = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.debouncedQuery = '';
    },
  },
});

export const { setSearchQuery, setDebouncedQuery, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;