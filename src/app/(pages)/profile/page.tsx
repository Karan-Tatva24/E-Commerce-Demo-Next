import OrderHistory from "@/components/profile/OrderHistory";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Sidebar from "@/components/profile/Sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User Profile",
};

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileHeader />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-6">
        <Sidebar />
        <div className="space-y-6">
          <OrderHistory />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
