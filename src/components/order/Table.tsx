import { generateBill } from "@/lib/utils";
import { Order } from "@/types/UsersData";
import React from "react";

const Table = ({ order }: { order: Order }) => {
  const { total } = generateBill(order.items);
  return (
    <table className="w-full">
      <thead className="bg-gray-300 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
            Product
          </th>
          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
            Quantity
          </th>
          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
            Unit Price
          </th>
          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {order.items?.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-3 text-sm font-medium">{item.title}</td>
            <td className="px-4 py-3 text-sm text-right">{item.quantity}</td>
            <td className="px-4 py-3 text-sm text-right">
              {item.price.toFixed(2)}
            </td>
            <td className="px-4 py-3 text-sm text-right">
              {(item.quantity! * item.price).toFixed(2)}
            </td>
          </tr>
        ))}
        <tr>
          <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400 col-span-4">
            <span className="font-bold">Total Bill:</span> ${total.toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
