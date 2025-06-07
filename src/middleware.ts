import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("chatAppToken")?.value;
  const pathname = req.nextUrl.pathname;

  let role: string | undefined;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      role = payload.role as string;
    } catch (err) {
      console.warn("Invalid or expired token", err);
    }
  }

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isUserRoute = pathname === "/";
  const isAdminRoute = pathname === "/dashboard";

  // ✅ If user is logged in and goes to login/register → redirect to home or dashboard
  if (token && isAuthRoute) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ✅ If not logged in and accessing protected routes → redirect to login
  if (!token && (isUserRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ If role is user and tries to access admin route → redirect to /
  if (role === "user" && isAdminRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ If role is admin and tries to access user route → redirect to /dashboard
  if (role === "admin" && isUserRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Allow access otherwise
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/login", "/register"],
};
