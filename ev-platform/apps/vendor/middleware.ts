import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analytics/:path*",
    "/customers/:path*",
    "/inventory/:path*",
    "/leads/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/reviews/:path*",
    "/settings/:path*",
    "/showroom/:path*",
  ],
};
