"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";

export function Link({ to, href, children, ...props }) {
  return (
    <NextLink href={href ?? to ?? "/"} {...props}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  return { pathname: usePathname() };
}

export function useNavigate() {
  const router = useRouter();
  return (href) => router.push(href);
}

export function useParams() {
  return useNextParams();
}
