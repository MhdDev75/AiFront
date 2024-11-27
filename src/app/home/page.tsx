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
            {t("header")}{" "}
          </button>
          <button
            className="py-2 px-8 bg-buttons rounded-md text-typography m-2"
            onClick={() => changeTheme("dark")}
          >
            dark
          </button>
          <button
            className="py-2 px-8 bg-buttons  rounded-md text-typography m-2"
            onClick={() => changeTheme("minimalist")}
          >
            winter
          </button>
        </div>
        <LocaleSwitcher />
       
      </div>
    </div>
  );
};

export default HomePage;
