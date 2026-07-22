import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/addSongs", "/editSong"];
// const publicRoutes = ["/login", "/"];

export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  //   const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get("highway-session")?.value;
  const decryptedSession = cookie ? await decrypt(cookie) : null;
  try {
    const session = decryptedSession ? JSON.parse(decryptedSession) : null;
    // 4. Redirect to /login if the user is not authenticated
    if (
      isProtectedRoute &&
      (!session?.userId || session?.password !== process.env.PASSWORD)
    ) {
      const loginUrl = new URL("/login", req.nextUrl);
      loginUrl.searchParams.set("redirectTo", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error("Failed to parse session:", error);
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("redirectTo", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Redirect to /dashboard if the user is authenticated
  //   if (
  //     isPublicRoute &&
  //     session?.userId &&
  //     !req.nextUrl.pathname.startsWith("/login")
  //   ) {
  //     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  //   }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
