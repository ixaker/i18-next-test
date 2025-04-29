import Link from "next/link";
import { User } from "../types/user";

const translations: Record<string, { welcome: string }> = {
  en: { welcome: "Welcome to the homepage!" },
  ru: { welcome: "Добро пожаловать на главную!" },
  uk: { welcome: "Ласкаво просимо на головну!" },
};

export default async function Page({ params }: { params: { locale: string } }) {
  const t = translations[params.locale] || translations.en;

  const user = (await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .catch((err) => console.error(err))) as User[];

  return (
    <>
      <h1>{t.welcome}</h1>
      <div className="flex flex-col gap-2 max-w-xl my-0 mx-auto px-4">
        {user.map((item, index) => (
          <Link
            href={`${params.locale}/${item.id}`}
            key={index}
            className="border p-2 rounded hover:bg-gray-100 transition"
          >
            <h2>{item.name}</h2>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.website}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
