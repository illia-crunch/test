import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';
import { initialProducts } from '../data/products';
import { loadState, saveState } from '../utils/localStorage';

interface ProductState {
  products: Product[];
  searchText: string;
  sortBy: 'name' | 'creationDate';
  currentPage: number;
  itemsPerPage: number;
}

const LOCAL_STORAGE_KEY = 'products';

const initialState: ProductState = {
  products: loadState(LOCAL_STORAGE_KEY) || initialProducts,
  searchText: '',
  sortBy: 'name',
  currentPage: 1,
  itemsPerPage: 5,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      saveState(LOCAL_STORAGE_KEY, state.products); // Save to localStorage
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      saveState(LOCAL_STORAGE_KEY, state.products); // Save to localStorage
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveState(LOCAL_STORAGE_KEY, state.products); // Save to localStorage
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'creationDate'>) => {
      state.sortBy = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  setSearchText,
  setSortBy,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
