"use client";

import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.users);
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const isProtected = () => {
      if (
        (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) &&
        user.isLoggedIn
      ) {
        setIsAuth(false);
        router.push("/");
      } else if (
        (pathname.startsWith("/profile") || pathname.startsWith("/order")) &&
        !user.isLoggedIn
      ) {
        setIsAuth(false);
        router.replace("/sign-in");
      } else {
        setIsAuth(true);
      }
    };
    isProtected();
  }, [pathname, router, user.isLoggedIn]);

  return isAuth ? <>{children}</> : null;
};

export default AuthProvider;
