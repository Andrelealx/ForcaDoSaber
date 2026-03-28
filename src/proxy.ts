import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function resolveLayoutMode(pathname: string): "admin" | "print" | null {
  if (!pathname.startsWith("/admin")) {
    return null;
  }

  if (/^\/admin\/(?:carteirinhas\/[^/]+\/(?:impressao|print))$/.test(pathname)) {
    return "print";
  }

  return "admin";
}

export function proxy(request: NextRequest) {
  const mode = resolveLayoutMode(request.nextUrl.pathname);
  if (!mode) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-fds-layout-mode", mode);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
