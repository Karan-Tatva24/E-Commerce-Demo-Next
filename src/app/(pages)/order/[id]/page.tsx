"use client";

import Table from "@/components/order/Table";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const OrderPage = ({ params }: { params: { id: string } }) => {
  const { user } = useAppSelector((state) => state.users);

  const orderIndex = user.orders.findIndex((order) => order.id === params.id);

  if (orderIndex === -1) {
    return (
      <div className="text-red-500 text-4xl text-center">Order Not Found!!</div>
    );
  }
  const order = user.orders[orderIndex];

  const handleDownloadPdf = async () => {
    try {
      const input = document.getElementById("bill-content");

      if (input) {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("l", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
        const pdfHeight = ((canvas.height * pdfWidth) / canvas.width);

        let heightLeft = pdfHeight;
        let position = 10;

        pdf.addImage(imgData, "PNG", 10, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
        }

        pdf.save(`OrderBill_${params.id}.pdf`);
      }
    } catch (error) {
      console.error("Failed to download the PDF:", error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      <div id="bill-content" className="grid gap-8">
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
                {order.paymentMethod}
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
            <div className="mb-4">
              <h3 className="text-lg font-medium">Customer Phone</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button onClick={handleDownloadPdf}>Download Bill</Button>
      </div>
    </div>
  );
};

export default OrderPage;
