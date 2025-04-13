import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async(auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/auth" 

  // If user is signed in and trying to access /sign-in or /sign-up, redirect to dashboard
  if (userId && isAuthPage) {
    const dashboardUrl = new URL("/question", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // If user is not signed in and trying to access protected routes
  const isPublic = ["/auth"].includes(pathname);
  if (!userId && !isPublic) {
    const signInUrl = new URL("/auth", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
