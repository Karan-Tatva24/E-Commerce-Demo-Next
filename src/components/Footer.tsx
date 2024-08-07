import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bottom-0 min-w-full mt-4">
      <footer className="border-t bg-white">
        <div className="container grid items-center justify-center gap-4 py-4 text-sm md:grid-cols-[1fr_1fr_1fr] md:py-6">
          <nav className="flex items-center gap-4 justify-start text-gray-500 dark:text-gray-400">
            <Link href="/" className="font-medium" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="font-medium" prefetch={false}>
              Products
            </Link>
            <Link href="#" className="font-medium" prefetch={false}>
              Contact
            </Link>
          </nav>
          <p className="flex items-center gap-2 text-center md:justify-self md:order-3">
            &copy; 2023 DemoKart Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
