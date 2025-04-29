const translations: Record<string, { welcome: string }> = {
  en: { welcome: "Welcome to the User Page!" },
  ru: { welcome: "Добро пожаловать на  страница пользователя!" },
  uk: { welcome: "Ласкаво просимо на сторінка користувача!" },
};

const User = async ({
  params,
}: {
  params: { locale: string; user: number };
}) => {
  const t = translations[params.locale] || translations.en;
  console.log("params", params);

  return (
    <>
      <h1>{t.welcome}</h1>
      {params.user}
    </>
  );
};

export default User;
