import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "uk", "ru"];

// Get the preferred locale, similar to the above or using a library
function getLocale(req: NextRequest) {
  const acceptLang = req.headers.get("accept-language");
  const browserLang = acceptLang?.split(",")[0].split("-")[0] || "en";

  return browserLang;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("pathname", pathname);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  console.log("pathnameHasLocale", pathnameHasLocale, pathname);

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     // "/((?!_next).*)",
//     // Optional: only run on root (/) URL
//     // "/",
//   ],
// };

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
