"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, PackageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/usersSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SearchSchema } from "@/schemas/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const { cart } = useAppSelector((state) => state.productsCart);

  const debounced = useDebounceCallback(setSearch, 1000);

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const handleLogout = () => {
    dispatch(logout({ id: user.id }));
    router.push("/sign-in");
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  useEffect(() => {
    if (search !== "") router.push(`${pathname}?search=${search}`);
  }, [pathname, router, search]);

  const onSubmit = (data: z.infer<typeof SearchSchema>) => {
    console.log(data.search);
  };

  return (
    <div className="flex flex-col min-w-full">
      <header className="border-b">
        <div className="flex items-center justify-between py-2 px-4 md:py-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <PackageIcon className="h-6 w-6" />
              <span className="hidden md:block font-semibold">
                DemoKart Inc.
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="hidden md:flex gap-2"
              >
                <FormField
                  name="search"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      type="search"
                      placeholder="Search..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                      className="max-w-[350px] text-sm"
                    />
                  )}
                />
              </form>
            </Form>
            <Button variant="outline" size="sm" onClick={handleCartClick}>
              Cart
              <Badge variant="secondary" className="ml-1">
                {cart.length}
              </Badge>
              <span className="sr-only">Cart</span>
            </Button>
            {user.isLoggedIn ? (
              <>
                <span>
                  Welcome, <b>{user.username}</b>
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-full"
                    >
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href={"/sign-in"}>
                <Button size="sm">SignIn</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="pt-2 px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex md:hidden gap-2"
          >
            <FormField
              name="search"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="search"
                  placeholder="Search..."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debounced(e.target.value);
                  }}
                  className="max-w-full text-sm"
                />
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Navbar;
