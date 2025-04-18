"use client";
import Image from "next/image";
import {
  Bell,
  Languages,
  LetterText,
  LucideUserRoundCheck,
  Palette,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { localesMap } from "@/core/i18n/config";
import { Locale } from "@/core/i18n/types";
import { setLocale } from "@/core/i18n/locale";
import { changeTheme } from "@/utils/helper";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { getUser, postUserLanguage } from "@/api/userActions";
import { IApiUser } from "@/lib/type";

const ProfilePage = () => {
  const [user, setUser] = useState<IApiUser>();

  const hasLocale = useLocale();
  const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();
  const onChange = (value: string) => {
    const locale = value as Locale;
    postUserLanguage(locale.toUpperCase() as "EN" | "FA");
    setLocale(locale);
  };

  const [theme, setTheme] = useState("dark");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["Theme"]);
  console.log(cookie.Theme);

  const themeList = ["light", "dark"];

  useEffect(() => {
    getUserInfo();
    setIsVisible(true); // دکمه بازگشت را فعال کنید
  }, []);

  useEffect(() => {
    setTheme(cookie.Theme);
  }, [cookie.Theme]);

  const getUserInfo = async () => {
    try {
      const response = await getUser();
      console.log(response);
      if (response.isSuccess) {
        setUser(response.value as IApiUser);
      } else {

      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="bg-base-200 rounded-md p-3">
        {user && (
          <div className="flex flex-row gap-2">
            <Image
              src={user?.photoUrl}
              width={60}
              height={60}
              className="rounded-2xl border-1 border-sky-400"
              alt="Avatar"
            />
            <div className="flex flex-col gap-2">
              <span className="font-bold text-xl">
                {user?.firstName + " " + user?.lastName}
              </span>
              <span className="text-muted">{user?.username}</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-base-200 collapse">
          <input type="checkbox" className="peer" />
          <div className="collapse-title collapse-arrow border-base-300 bg-base-200 border">
            <span className="flex flex-row gap-2 items-center border-none">
              <div className="p-2 rounded-md bg-primary bg-opacity-35">
                <LucideUserRoundCheck size={20} />
              </div>
              {t("Profile.UserInfo")}
            </span>
          </div>
          <div className="collapse-content ">
            <div className="flex flex-col gap-3 p-3">
              <div className="flex flex-row justify-between">
                <div>{t("Profile.Name")}</div>
                <div>{user?.firstName}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>{t("Profile.LastName")}</div>
                <div>{user?.lastName}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>{t("Profile.PhoneNumber")}</div>
                <div>**********</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base-200 collapse">
          <input type="checkbox" className="peer" />
          <div className="collapse-title collapse-arrow border-base-300 bg-base-200 border">
            <span className="flex flex-row gap-2 items-center">
              <div className="p-2 rounded-md bg-primary bg-opacity-35">
                <Languages size={20} />
              </div>
              {t("Profile.Language")}
            </span>
          </div>
          <div className="collapse-content ">
            <div className="flex flex-row gap-2 p-3">
              {localesMap.map((item) => (
                <button
                  className={`${
                    hasLocale != item.key ? "btn-outline btn-primary" : "btn-primary"
                  } btn btn-sm `}
                  onClick={() => onChange(item.key)}
                  key={item.key}
                >
                  {t(`Profile.${item.title}`)}
                  {}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-base-200 collapse">
          <input type="checkbox" className="peer" />
          <div className="collapse-title collapse-arrow border-base-300 bg-base-200 border">
            <span className="flex flex-row gap-2 items-center">
              <div className="p-2 rounded-md bg-primary bg-opacity-35">
                <Palette size={20} />
              </div>
              {t("Profile.Theme")}
            </span>
          </div>
          <div className="collapse-content ">
            <div className="grid grid-cols-2  gap-1 p-3">
              {themeList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => changeTheme(item)}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <div
                    className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent"
                    data-act-class="!outline-base-content"
                    data-set-theme={item}
                  >
                    <div
                      className="bg-base-100 text-base-content w-full cursor-pointer f"
                      data-theme={item}
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div>
                        <div className="bg-base-300 col-start-1 row-start-3"></div>
                        <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                          <div className="font-bold">
                            {t(`Profile.${item}`)}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                              <div className="text-primary-content text-sm font-bold">
                                A
                              </div>
                            </div>
                            <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                              <div className="text-secondary-content text-sm font-bold">
                                A
                              </div>
                            </div>{" "}
                            <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                              <div className="text-accent-content text-sm font-bold">
                                A
                              </div>
                            </div>
                            <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                              <div className="text-neutral-content text-sm font-bold">
                                A
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name={`radio-${index}`}
                    className="radio radio-primary"
                    checked={theme == item}
                    onChange={() => changeTheme(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-base-200 collapse">
          <input type="checkbox" className="peer" />
          <div
            aria-disabled
            className="collapse-title collapse-arrow border-base-300 bg-base-200 border"
          >
            <span className="flex flex-row disabled:text-secondary gap-2 items-center">
              <div className="p-2 rounded-md bg-secondary bg-opacity-35">
                <LetterText size={20} />
              </div>
              {t("Profile.FontSize")}
              <span className="bg-primary p-1 rounded-md bg-opacity-50 text-xs ">
                {t("Soon")}
              </span>
            </span>
          </div>
        </div>
        <div className="bg-base-200 collapse">
          <input type="checkbox" className="peer" />
          <div
            aria-disabled
            className="collapse-title collapse-arrow border-base-300 bg-base-200 border"
          >
            <span className="flex flex-row disabled:text-secondary gap-2 items-center">
              <div className="p-2 rounded-md bg-secondary bg-opacity-35">
                <Bell size={20} />
              </div>
              {t("Profile.Notification")}
              <span className="bg-primary p-1 rounded-md bg-opacity-50 text-xs ">
                {t("Soon")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
