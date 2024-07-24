import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Update session using Supabase middleware
  const sessionResponse = await updateSession(request);

  // Create Supabase client
  const supabase = createClient();

  // Get the current user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const userRoles = user.user_metadata;

  // Role-based redirection
  if (
    request.nextUrl.pathname.startsWith("/superadmin") &&
    !userRoles.is_qr_superadmin
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin") && !userRoles.is_qr_admin) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/member") &&
    !userRoles.is_qr_member
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return sessionResponse;
}

export const config = {
  matcher: [
    "/superadmin/:path*",
    "/admin/:path*",
    "/member/:path*",
    // Match all request paths except for the ones starting with:
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
