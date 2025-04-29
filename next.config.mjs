/** @type {import('next').NextConfig} */
const nextConfig = {
  //   i18n: {
  //     locales: ["en"],
  //     defaultLocale: "en",
  //   },

  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
