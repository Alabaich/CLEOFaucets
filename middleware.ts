import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import admin from "./src/utils/firebaseAdmin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next(); // Allow access to login
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
      // Redirect to login if no token
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const allowedEmails = ["enjoyable.design@gmail.com", "info@plumbingmarket.ca", "14alabaika88@gmail.com"];

      if (!decodedToken.email || !allowedEmails.includes(decodedToken.email)) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = "/admin/login";
        return NextResponse.redirect(loginUrl);
      }

      return NextResponse.next(); // Allow access if authenticated
    } catch (error) {
      console.error("Middleware error:", error);
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next(); // Allow non-admin routes
}

export const config = {
  matcher: ["/admin/:path*"], // Protect all admin routes
};
