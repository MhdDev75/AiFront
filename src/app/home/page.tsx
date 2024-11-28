"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { changeTheme } from "@/utils/helper";
import { useTranslations } from "next-intl";

const HomePage: React.FC = () => {
  const t = useTranslations("i18n");

  return (
    <div>
      <div className="h-screen grid place-items-center ">
      <h1>Home Page</h1>
      <p>This is the main content of the website.</p>
        <div>
          <button
            className="py-2 px-8 bg-buttons  rounded-md text-typography m-2"
            onClick={() => changeTheme("light")}
          >
            {t("Theme.Light")}
          </button>
          <button
            className="py-2 px-8 bg-buttons rounded-md text-typography m-2"
            onClick={() => changeTheme("dark")}
          >
             {t("Theme.Dark")}
          </button>
          <button
            className="py-2 px-8 bg-buttons rounded-md text-typography m-2"
            onClick={() => changeTheme("colorize")}
          >
             {t("Theme.Colorize")}
          </button>
          
          <button
            className="py-2 px-8 bg-buttons  rounded-md text-typography m-2"
            onClick={() => changeTheme("minimalist")}
          >
             {t("Theme.Minimalist")}
          </button>
          <button
            className="py-2 px-8 bg-buttons  rounded-md text-typography m-2"
            onClick={() => changeTheme("winter")}
          >
             {t("Theme.Winter")}
          </button>
          <button
            className="py-2 px-8 bg-buttons  rounded-md text-typography m-2"
            onClick={() => changeTheme("summer")}
          >
             {t("Theme.Summer")}
          </button>
          <button
            className="py-2 px-8 bg-buttons  rounded-md text-typography m-2"
            onClick={() => changeTheme("autumn")}
          >
             {t("Theme.Autumn")}
          </button>
          <button
            className="py-2 px-8 bg-buttons  rounded-md text-typography m-2"
            onClick={() => changeTheme("spring")}
          >
             {t("Theme.Spring")}
          </button>
        </div>
        <LocaleSwitcher />
       
      </div>
    </div>
  );
};

export default HomePage;
