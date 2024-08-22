import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      <div className="grid gap-8">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Order #{params.id}</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Placed on June 15, 2023
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium">Shipping Address</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                123 Main St, Anytown USA 12345
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Delivery Status</h3>
              <div className="text-sm text-green-500 dark:text-green-400">
                Delivered
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-800">
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
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">
                    Wireless Headphones
                  </td>
                  <td className="px-4 py-3 text-sm text-right">2</td>
                  <td className="px-4 py-3 text-sm text-right">$99.99</td>
                  <td className="px-4 py-3 text-sm text-right">$199.98</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">
                    Ergonomic Office Chair
                  </td>
                  <td className="px-4 py-3 text-sm text-right">1</td>
                  <td className="px-4 py-3 text-sm text-right">$249.99</td>
                  <td className="px-4 py-3 text-sm text-right">$249.99</td>
                </tr>
              </tbody>
            </table>
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
                Processed on June 15, 2023 at 3:45 PM
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
                John Doe
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Customer Email</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                john.doe@example.com
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Customer Phone</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                +1 (555) 555-5555
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
