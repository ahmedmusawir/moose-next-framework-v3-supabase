import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  await updateSession(request);
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const userRoles = data.user.user_metadata;
  if (
    request.nextUrl.pathname.startsWith("/superadmin-portal") &&
    userRoles.is_qr_superadmin !== 1
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    userRoles.is_qr_admin !== 1
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/members-portal") &&
    userRoles.is_qr_member !== 1
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/superadmin-portal/:path*",
    "/dashboard/:path*",
    "/members-portal/:path*",
  ],
};
