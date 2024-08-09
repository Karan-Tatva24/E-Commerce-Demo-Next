import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { rootReducer } from "./slices";

// const isClient = typeof window !== "undefined";

// let store;
// let persistor;

// if (isClient) {
//   const persistConfig = {
//     key: "root",
//     storage,
//   };

//   const persistedReducer = persistReducer(persistConfig, rootReducer);

//   store = configureStore({
//     reducer: {
//       root: persistedReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//         },
//       }),
//   });

//   persistor = persistStore(store);
// } else {
 const store = configureStore({
    reducer: {
      root: rootReducer,
    },
  });

  // persistor = null;
// }

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
