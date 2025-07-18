import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/addSongs"];
// const publicRoutes = ["/login", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  //   const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("highway-session")?.value;
  console.log("Cookie value:", cookie);
  const decryptedSession = cookie ? await decrypt(cookie) : null;
  try {
    const session = decryptedSession ? JSON.parse(decryptedSession) : null;
    // 4. Redirect to /login if the user is not authenticated
    if (
      isProtectedRoute &&
      (!session?.userId || session?.password !== process.env.PASSWORD)
    ) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  } catch (error) {
    console.error("Failed to parse session:", error);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
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
