"use client";

import {
  CogIcon,
  HeartIcon,
  HomeIcon,
  ShoppingCartIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-950 rounded-lg shadow-sm">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className={`flex items-center gap-2 ${
                isActive("/")
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
              prefetch={false}
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className={`flex items-center gap-2 ${
                isActive("/profile")
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
              prefetch={false}
            >
              <User2Icon className="w-4 h-4" />
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/order-history"
              className={`flex items-center gap-2 ${
                isActive("/order-history")
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
              prefetch={false}
            >
              <ShoppingCartIcon className="w-4 h-4" />
              Order History
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`flex items-center gap-2 ${
                isActive("#")
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
              prefetch={false}
            >
              <HeartIcon className="w-4 h-4" />
              Wishlist
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`flex items-center gap-2 ${
                isActive("#")
                  ? "text-gray-900 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
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
