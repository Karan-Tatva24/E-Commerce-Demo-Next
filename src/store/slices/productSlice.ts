import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
