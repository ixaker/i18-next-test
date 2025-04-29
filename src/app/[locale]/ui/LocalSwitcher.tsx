"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LocalSwitcher: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (locale: string) => {
    const segments = pathname.split("/").filter(Boolean);

    // Проверяем, является ли первый сегмент текущей локалью
    const currentLocale = ["en", "ru", "uk"].includes(segments[0])
      ? segments[0]
      : null;

    if (currentLocale) {
      segments[0] = locale; // заменяем текущую локаль
    } else {
      segments.unshift(locale); // добавляем локаль в начало
    }

    const newPath = "/" + segments.join("/");
    router.push(newPath);
  };

  return (
    <div className="space-x-2 mt-2 px-2">
      {["en", "ru", "uk"].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLocale(lang)}
          className="border px-2 py-1 rounded hover:bg-gray-100 transition"
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LocalSwitcher;
