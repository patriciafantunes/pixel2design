import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";
import { Lang } from "./types/lang";

function getLocale(request: NextRequest): Lang {
  const acceptLanguageHeader = request.headers.get("accept-language");
  const availableLocales = i18n.locales;
  const defaultLocale = i18n.defaultLocale || "pt";

  if (!acceptLanguageHeader) return defaultLocale;

  const acceptedLanguages = acceptLanguageHeader
    .split(",")
    .map((lang) => lang.split(";")[0].trim());

  for (const lang of acceptedLanguages) {
    if (availableLocales.includes(lang as Lang)) {
      return lang as Lang;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200 });
  }

  if (/\.(mp4|webm|png|jpg|jpeg|gif|svg|webp|ico|json|txt)$/i.test(pathname)) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const redirectUrl = new URL(
      `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    );

    const response = NextResponse.redirect(redirectUrl);
    response.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600");

    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=3600");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
