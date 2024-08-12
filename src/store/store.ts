import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./slices";

interface StoreWithPersistor extends EnhancedStore {
  __persistor?: Persistor;
}

const persistConfig = {
  key: "root",
  storage,
};

const makeConfiguredStore = (): StoreWithPersistor => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const makeStore = (): StoreWithPersistor => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store: StoreWithPersistor = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
