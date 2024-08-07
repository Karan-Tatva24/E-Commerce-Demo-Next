"use client";
import Image from "next/image";
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
import { PackageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/usersSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SearchSchema } from "@/schemas/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.root.users);

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

  const onSubmit = (data: z.infer<typeof SearchSchema>) => {
    if (data.search !== "")
      router.push(`${pathname}?search=${data.search}`);
    else 
      router.push(`${pathname}`)
  };

  return (
    <div className="flex flex-col min-w-full">
      <header className="border-b">
        <div className="container flex items-center justify-between py-2 px-4 md:py-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <PackageIcon className="h-6 w-6" />
              <span className="font-semibold">DemoKart Inc.</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Products
            </Link>
            <Link
              href="#"
              className="font-medium text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
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
                      className="max-w-[300px] text-sm"
                    />
                  )}
                />
                <Button type="submit" size="sm">
                  Search
                </Button>
              </form>
            </Form>
            <Button variant="outline" size="sm" onClick={handleCartClick}>
              Cart
              <Badge className="ml-1">3</Badge>
              <span className="sr-only">Cart</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full"
                >
                  <Image
                    src="/Images/watch.jpg"
                    width="32"
                    height="32"
                    className="rounded-full"
                    alt="Avatar"
                    style={{ aspectRatio: "32/32", objectFit: "cover" }}
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
