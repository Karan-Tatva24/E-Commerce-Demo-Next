"use client";

import { CogIcon, HeartIcon, HomeIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <nav className="bg-white dark:bg-gray-950 rounded-lg shadow-sm">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <ShoppingCartIcon className="w-4 h-4" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <HeartIcon className="w-4 h-4" />
              Wishlist
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <CogIcon className="w-4 h-4" />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
