/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import iconLight from "@/assets/images/Ai_Studio-light.svg";
import iconDark from "@/assets/images/Ai_Studio-dark.svg";
import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { getUserRegion, loginWithTelegram } from "@/api/userActions";
import { setRegion } from "@/utils/helper";

export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();
  const [cookie, setCookie] = useCookies(["token", "NewUser", "Theme"]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    localStorage.clear();
    setCookie("token", null);
    setIsVisible(false); // دکمه بازگشت را فعال کنید
    setTheme(cookie.Theme);
    loginUser();
  }, []);

  const getUserRegionClient = async () => {
    const response = await getUserRegion();
    if (response.isSuccess) {
      if (!response.value.id) {
        return false;
      }
      if (response.value.id == 1) {
        setRegion("fa");
        localStorage.setItem("Region", "FA");
        return true;
      } else {
        setRegion("en");
        localStorage.setItem("Region", "EN");
        return true;
      }
    }
  };

  const loginUser = async () => {
    try {
      const app = (window as any).Telegram?.WebApp;
      const response = await loginWithTelegram(app.initData, app.initDataUnsafe?.start_param);

      if (response.isSuccess) {
        setCookie("NewUser", response.value.isNew);
        setCookie("token", response.value.token);

        localStorage.setItem("token", response.value.token);
        const totalDuration = 3000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
        const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
        const steps = totalDuration / increment;
        let currentStep = 0;
        const timer = setInterval(async () => {
          currentStep++;
          setProgress((currentStep / steps) * 100);

          if (currentStep >= steps) {
            clearInterval(timer);
            if (response.value.isNew == false && await getUserRegionClient()) {
              router.push("/panel/home");
            } else {
              router.push("/region");
            }
          }
        }, increment);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: Error | any) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col h-screen main-div">
      <main className="container  mx-auto relative flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-3   overflow-hidden h-full justify-center items-center">
          <span className="relative flex justify-center  items-center h-52 w-52">
            <Image
              src={theme === "light" ? iconLight : iconDark}
              alt="welcome"
              width={100}
            />
            <span className=" absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-3/4 w-3/4 rounded-full bg-neutral "></span>
            <span className=" absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-4/4 w-4/4 rounded-full bg-neutral opacity-35"></span>
            <span className="animate-ping absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0  h-3/4 w-3/4  rounded-full bg-neutral opacity-35"></span>
          </span>
          <h1 className="text-2xl text-primary font-extrabold text-center">
            {t("welcome")}
          </h1>
          <progress
            className="progress progress-success w-56 mt-5"
            value={progress}
            max="100"
          ></progress>
          <span className="text-sm ">{t("Version")} : 0.0.4</span>
        </div>
      </main>
    </div>
  );
}
