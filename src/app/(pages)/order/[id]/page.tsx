"use client";

import Table from "@/components/order/table";
import { useAppSelector } from "@/store/hooks";
import React from "react";

const OrderPage = ({ params }: { params: { id: string } }) => {
  const { user } = useAppSelector((state) => state.users);

  const orderIndex = user.orders.findIndex((order) => order.id === params.id);

  if (orderIndex === -1) {
    return (
      <div className="text-red-500 text-4xl text-center">Order Not Found!!</div>
    );
  }
  const order = user.orders[orderIndex];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      <div className="grid gap-8">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Order #{params.id}</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Placed on {new Date(order.date).toDateString()}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium">Shipping Address</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {order.shippingAddress || "123 Main St, Anytown USA 12345"}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Delivery Status</h3>
              <div className="text-sm text-green-500 dark:text-green-400">
                {order.deliveryStatus || "Delivered"}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table order={order} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium">Payment Method</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Visa ending in 1234
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Transaction Details</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Processed on {new Date(order.date).toUTCString()}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Customer Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium">Customer Name</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.username}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Customer Email</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Customer Phone</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
