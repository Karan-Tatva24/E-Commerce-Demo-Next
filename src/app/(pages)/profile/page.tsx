"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { CogIcon, HeartIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.users);
  const router = useRouter();

  const handleOrderCardClick = (orderId: string) => {
    router.push(`/order/${orderId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-300 dark:bg-gray-800 py-8 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={user.username}
            />
            <AvatarFallback>
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {user.email}
            </p>
          </div>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-6">
        <nav className="bg-white dark:bg-gray-950 rounded-lg shadow-sm">
          <div className="px-4 py-6">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  <UserIcon className="w-4 h-4" />
                  Profile
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
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Order History</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.orders?.map((order) => (
              <Card
                key={order.id}
                className="bg-white dark:bg-gray-950 shadow-sm"
                onClick={() => handleOrderCardClick(order.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 dark:text-gray-400">
                      {order.id}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-4 font-semibold">${order.orderValue}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
