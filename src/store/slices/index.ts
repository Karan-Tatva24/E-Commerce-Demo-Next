import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import productCartReducer from "./productCartSlice";
import productReducer from "./productSlice";

export const rootReducer = combineReducers({
  users: usersReducer,
  productsCart: productCartReducer,
  products: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
