import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bottom-0 min-w-full mt-4">
      <footer className="border-t bg-white">
        <div className="flex items-center justify-center gap-4 py-4 text-sm md:py-6">
          <p className="flex items-center gap-2 text-center md:justify-self md:order-3">
            &copy; 2023 DemoKart Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
