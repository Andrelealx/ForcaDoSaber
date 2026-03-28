import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-constants";

const ADMIN_LOGIN_PATH = "/admin/login";
const PRINT_CARD_ROUTE_REGEX = /^\/admin\/carteirinhas\/[^/]+\/(?:print|impressao)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/api/admin")) {
    if (!hasSession) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }
  }

  const requestHeaders = new Headers(request.headers);
  if (pathname.startsWith("/admin")) {
    if (PRINT_CARD_ROUTE_REGEX.test(pathname)) {
      requestHeaders.set("x-fds-layout-mode", "print");
      requestHeaders.set("x-fds-print-only", "1");
    } else {
      requestHeaders.set("x-fds-layout-mode", "admin");
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
