import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_VENDOR_PATHS = [
  "/dashboard",
  "/analytics",
  "/customers",
  "/inventory",
  "/leads",
  "/orders",
  "/products",
  "/reviews",
  "/settings",
  "/showroom",
] as const;

function readRole(user: { app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> } | null) {
  return String(user?.app_metadata?.role ?? user?.user_metadata?.role ?? "user");
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const isProtected = PROTECTED_VENDOR_PATHS.some((path) => request.nextUrl.pathname.startsWith(path));
  if (!isProtected) return response;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = readRole(user);
  if (!["vendor", "admin", "super_admin"].includes(role)) {
    const forbiddenUrl = request.nextUrl.clone();
    forbiddenUrl.pathname = "/";
    forbiddenUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(forbiddenUrl);
  }

  return response;
}
