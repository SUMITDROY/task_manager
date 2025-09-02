import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// paths that need protection
const protectedRoutes = ["/dashboard"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// specify which paths middleware runs on
export const config = {
  matcher: ["/dashboard/:path*"],
};
