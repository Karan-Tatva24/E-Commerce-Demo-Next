"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { usePathname } from "next/navigation";

const LayoutWithoutWrapper = ["/profile", "/order"];

const LayoutWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  if (
    LayoutWithoutWrapper.includes(pathname) ||
    pathname.startsWith("/order")
  ) {
    return children;
  }
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100% - 176px)]">{children}</main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
