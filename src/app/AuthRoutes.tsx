"use client";

import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthRoutes = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.users);
  const route = useRouter();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const isProtected = () => {
      if (
        (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) &&
        user.isLoggedIn
      ) {
        setIsAuth(false);
        route.push("/");
      } else {
        setIsAuth(true);
      }
    };
    isProtected();
  }, [pathname, route, user.isLoggedIn]);

  return isAuth ? <>{children}</> : null;
};

export default AuthRoutes;
