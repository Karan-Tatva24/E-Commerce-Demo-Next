import { CartState, Product } from "@/types/products";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CartState = {
  cart: [],
};

const getProductIndexInCart = (cart: Product[], id: number) => {
  return cart.findIndex((item) => item.id === id);
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (payload: { id: number }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${payload.id}`
      );
      if (res.data) return res.data;
      else throw new Error("Error while fetching product data");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const productCart = createSlice({
  name: "productCart",
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
    },
    decreaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const productIndex = getProductIndexInCart(state.cart, action.payload.id);

      if (productIndex !== -1 && state.cart[productIndex].quantity! > 1) {
        state.cart[productIndex].quantity! -= 1;
      } else {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
    increaseQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const productIndex = getProductIndexInCart(state.cart, action.payload.id);

      if (
        productIndex !== -1 &&
        state.cart[productIndex].quantity! < state.cart[productIndex].stock
      ) {
        state.cart[productIndex].quantity! += 1;
      } else {
        console.error("Product is out of stock");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const productIndex = getProductIndexInCart(
            state.cart,
            action.payload.id
          );

          if (productIndex !== -1) {
            state.cart[productIndex].quantity! += 1;
          } else {
            state.cart.push({ ...action.payload, quantity: 1 });
          }
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        console.error("Product fetch error:", action.payload);
      });
  },
});

export default productCart.reducer;
export const { removeProduct, increaseQuantity, decreaseQuantity } =
  productCart.actions;
