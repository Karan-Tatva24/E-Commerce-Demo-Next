import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import productCart from "./productCart";

export const rootReducer = combineReducers({
  users: usersSlice,
  productsCart: productCart,
});

export type RootState = ReturnType<typeof rootReducer>;
