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
      <main className="min-h-[780px] mt-8 md:mt-20">{children}</main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
