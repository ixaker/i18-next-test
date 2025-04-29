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
