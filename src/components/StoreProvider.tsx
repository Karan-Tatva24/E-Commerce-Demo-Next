"use client";

import React, { useMemo } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Memoize the store to ensure it is created only once
  const storeInstance = useMemo(() => store, []);

  return <Provider store={storeInstance}>{children}</Provider>;
}
