import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import productCart from "./productCart";
import productReducer from "./productSlice";

export const rootReducer = combineReducers({
  users: usersReducer,
  productsCart: productCart,
  products: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
