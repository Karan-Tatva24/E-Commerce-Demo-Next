import OrderHistory from "@/components/profile/OrderHistory";
import Sidebar from "@/components/profile/Sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Order-History",
};

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-6">
        <Sidebar />
        <div className="space-y-6">
          <OrderHistory />
        </div>
      </div>
    </div>
  );
};

export default page;
