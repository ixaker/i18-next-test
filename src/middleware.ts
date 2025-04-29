import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "uk", "ru"];

function getLocale(req: NextRequest) {
  const acceptLang = req.headers.get("accept-language");
  const browserLang = acceptLang?.split(",")[0].split("-")[0] || "en";

  return locales.includes(browserLang) ? browserLang : "en";
}

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);

  console.log("origin", origin);

  const newUrl = `${origin}/${locale}${pathname}`;

  return NextResponse.redirect(new URL(newUrl));
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
