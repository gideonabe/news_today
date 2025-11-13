import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  selectedCategory: string;
}

const initialState: CategoryState = {
  selectedCategory: 'All',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    resetCategory: (state) => {
      state.selectedCategory = 'All';
    },
  },
});

export const { setSelectedCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;