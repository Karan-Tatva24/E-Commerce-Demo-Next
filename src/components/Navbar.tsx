"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/Images/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  CircleUserRound,
  Package2,
  Search,
  ShoppingCart,
} from "lucide-react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { logout } from "@/store/slices/usersSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.root.users);

  // const { id, username, isLoggedIn } = user;

  return (
    <div className="bg-white h-full flex justify-center items-center flex-wrap w-full py-8 relative top-0">
      <div className="flex items-center justify-between flex-wrap gap-8 fixed">
        <div>
          <Link href="/">
            <Image src={Logo} alt="logo" width={150} />
          </Link>
        </div>
        <div className="hidden sm:block">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search For Products"
              className="w-full rounded-lg bg-background pl-8 md:w-[500px] lg:w-[700px] bg-blue-100"
            />
          </div>
        </div>
        <div>
          <Button
            variant="ghost"
            className="hover:bg-blue-700 hover:text-white flex gap-2"
            onClick={() => {}}
          >
            <CircleUserRound />
            <span>Login</span>
            <ChevronDown />
          </Button>
        </div>
        <div className="flex gap-x-3">
          <ShoppingCart /> <span>Cart</span>
        </div>
        <div className="flex gap-x-3">
          <Package2 />
          <span className="text-base">Become a seller</span>
        </div>
        <div>
          <DotsVerticalIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
