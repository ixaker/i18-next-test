import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "ru", "uk"];
const DEFAULT_LOCALE = "en";
// Это минимальный middleware, который ничего не делает — просто пропускает запрос
export function middleware(req: NextRequest) {
  console.log("Попавли в middleware");

  // Можно залогировать, чтобы убедиться, что middleware сработал
  const { pathname } = req.nextUrl;

  console.log("pathname", pathname, req.nextUrl);

  console.log("pathname", pathname);

  const pathnameIsMissingLocale = !/^\/(en|ru|uk)(\/|$)/.test(pathname);

  if (pathnameIsMissingLocale) {
    const acceptLang = req.headers.get("accept-language");
    const browserLang =
      acceptLang?.split(",")[0].split("-")[0] || DEFAULT_LOCALE;
    const locale = SUPPORTED_LOCALES.includes(browserLang)
      ? browserLang
      : DEFAULT_LOCALE;

    const redirectPath = `/${locale}${pathname}`;

    // 👉 принудительно укажем нужный origin вручную (вручную подставляем домен)
    const fullUrl = new URL(redirectPath, process.env.BASE_URL);

    console.log("redirect to:", fullUrl.toString());

    return NextResponse.redirect(fullUrl);
  }
  // console.log('next');
  return NextResponse.next();
}

// import { NextRequest, NextResponse } from "next/server";

// const locales = ["en", "uk", "ru"];

// // Get the preferred locale, similar to the above or using a library
// function getLocale(req: NextRequest) {
//   const acceptLang = req.headers.get("accept-language");
//   const browserLang = acceptLang?.split(",")[0].split("-")[0] || "en";

//   return browserLang;
// }

// export function middleware(request: NextRequest) {
//   // const baseUrl = process.env.BASE_URL;
//   const { pathname } = request.nextUrl;

//   console.log("pathname", pathname);

//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   console.log("pathnameHasLocale", pathnameHasLocale, pathname);

//   if (pathnameHasLocale) return;

//   const locale = getLocale(request);
//   request.nextUrl.pathname = `/${locale}${pathname}`;

//   console.log("request.nextUrl", request.nextUrl);

//   return NextResponse.redirect(request.nextUrl);
// }

// export const config = {
//   matcher: "/((?!api|static|.*\\..*|_next).*)",
// };
