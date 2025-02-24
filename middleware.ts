import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";
import {Lang} from "./types/lang"

function getLocale(request: NextRequest): Lang {
  const acceptLanguageHeader = request.headers.get("accept-language");
  const availableLocales = i18n.locales;
  const defaultLocale = i18n.defaultLocale || "pt";

  if (!acceptLanguageHeader) return defaultLocale;

  const acceptedLanguages = acceptLanguageHeader
    .split(",")
    .map((lang) => lang.split(";")[0].trim());

  // Match the first available locale
  for (const lang of acceptedLanguages) {
    if (availableLocales.includes(lang as Lang)) {
      return lang as Lang;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files
  if (/\.(mp4|webm|png|jpg|jpeg|gif|svg|webp|ico|json|txt)$/i.test(pathname)) {
    return NextResponse.next(); // Allow Next.js to handle it normally
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],

};