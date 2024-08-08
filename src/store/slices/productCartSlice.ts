import { CartState, Product } from "@/types/products";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CartState = {
  products: [],
  quantity: [],
  totalProducts: 0,
  totalPrice: 0,
};

const getProductIndexInQuantity = (
  quantity: { id: number; quantity: number }[],
  id: number
) => quantity.findIndex((item) => item.id === id && item.quantity > 0);

const getProductIndexInProducts = (products: Product[], id: number) =>
  products.findIndex((item) => item.id === id);

export const addProduct = createAsyncThunk(
  "product/fetchProductDetails",
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

export const productCart = createSlice({
  name: "products cart",
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<{ id: number }>) => {
      const indexInProducts = getProductIndexInProducts(
        state.products,
        action.payload.id
      );
      const indexInQuantity = getProductIndexInQuantity(
        state.quantity,
        action.payload.id
      );

      if (
        indexInQuantity !== -1 &&
        state.quantity[indexInQuantity].quantity > 0
      ) {
        if (state.quantity[indexInQuantity].quantity <= 1) {
          state.totalPrice -= state.products[indexInProducts].price;
          state.totalProducts -= 1;
          state.quantity = state.quantity.filter(
            (item) => item.id !== action.payload.id
          );
          state.products = state.products.filter(
            (product) => product.id !== action.payload.id
          );
        } else {
          state.totalPrice -= state.products[indexInProducts].price;
          state.quantity[indexInQuantity].quantity -= 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        const productIndex = getProductIndexInQuantity(
          state.quantity,
          action.payload.id
        );
        if (productIndex !== -1) {
          state.quantity[productIndex].quantity += 1;
          state.totalPrice += action.payload.price;
        } else {
          state.products.push(action.payload);
          state.quantity.push({ id: action.payload.id, quantity: 1 });
          state.totalPrice += action.payload.price;
          state.totalProducts += 1;
        }
      }
    );
  },
});

export default productCart.reducer;
export const { removeProduct } = productCart.actions;
