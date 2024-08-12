import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import productCartReducer from "./productCartSlice";

export const rootReducer = combineReducers({
  users: usersReducer,
  productsCart: productCartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
