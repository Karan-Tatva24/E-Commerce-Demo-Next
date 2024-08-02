import { CartState, Product } from "@/types/ProductCartData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  productCart: [],
};

export const productCart = createSlice({
  name: "products cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const itemIndex = state.productCart.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      if (itemIndex === -1) {
        state.productCart.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      } else {
        state.productCart[itemIndex].quantity += action.payload.quantity;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; actionType: string }>
    ) => {
      const itemIndex = state.productCart.findIndex(
        (item) => item.product.id === action.payload.productId
      );
      if (itemIndex !== -1) {
        switch (action.payload.actionType) {
          case "ADD":
            state.productCart[itemIndex].quantity += 1;
            break;

          case "Remove":
            state.productCart[itemIndex].quantity -= 1;
            break;
          default:
            state.productCart[itemIndex];
        }
      }
    },
    removeProduct: (state, action: PayloadAction<{ productId: string }>) => {
      state.productCart = state.productCart.filter(
        (item) => item.product.id !== action.payload.productId
      );
    },
    clearCart: (state) => {
      state.productCart = [];
    },
  },
});

export default productCart.reducer;
export const { addToCart, updateQuantity, removeProduct, clearCart } =
  productCart.actions;
