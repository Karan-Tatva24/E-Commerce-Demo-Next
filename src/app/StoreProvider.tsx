"use client";

import React, { useMemo } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Memoize the store to ensure it is created only once
  const storeInstance = useMemo(() => store, []);

  return (
    <Provider store={storeInstance}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
