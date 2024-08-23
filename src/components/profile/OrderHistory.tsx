"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const OrderHistory = () => {
  const { user } = useAppSelector((state) => state.users);
  const router = useRouter();

  const handleOrderCardClick = (orderId: string) => {
    router.push(`/order/${orderId}`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Order History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.orders?.map((order) => (
          <Card
            key={order.id}
            className="bg-white dark:bg-gray-950 shadow-sm cursor-pointer"
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
    </>
  );
};

export default OrderHistory;
