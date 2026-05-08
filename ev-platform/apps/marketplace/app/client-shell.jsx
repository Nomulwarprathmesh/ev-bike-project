"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar.jsx";
import QueryProvider from "@/components/providers/QueryProvider.jsx";

const AUTH_ROUTES = ["/login", "/signup"];

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.includes(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <QueryProvider>
      {!isAuth && <Navbar />}
      <main className={!isAuth ? "pt-[76px]" : ""}>{children}</main>
    </QueryProvider>
  );
}
