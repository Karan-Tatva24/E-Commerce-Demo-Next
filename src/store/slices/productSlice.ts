import { Product } from "@/types/products";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: { products: Product[]; product: Product | null } = {
  products: [],
  product: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    payload: { limit?: number; page: number; search: string },
    { rejectWithValue }
  ) => {
    try {
      const skip = (payload.limit || 30) * (payload.page - 1);
      const response = await axios.get(
        `https://dummyjson.com/products/search?limit=${
          payload.limit || 30
        }&skip=${skip}&q=${payload.search}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (payload: { id: number }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${payload.id}`
      );
      if (res.data) return res.data;
      else throw new Error("Error while product data fetch");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
        }
      )
      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
        }
      );
  },
});

export default productSlice.reducer;
