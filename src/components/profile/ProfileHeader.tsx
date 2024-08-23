"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/store/hooks";

const ProfileHeader = () => {
  const { user } = useAppSelector((state) => state.users);

  return (
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
          <p className="text-gray-500 dark:text-gray-400 mt-2">{user.email}</p>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
