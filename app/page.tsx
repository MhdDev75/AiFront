"use client";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import iconLight from "@/assets/images/Ai_Studio-light.svg";
import iconDark from "@/assets/images/Ai_Studio-dark.svg";
import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { loginWithTelegram } from "@/api/userActions";
import { useTelegram } from "@/core/telegram/TelegramProvider";
// import { useTelegram } from "@/core/telegram/TelegramProvider";

export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();
  const { webApp } = useTelegram();
  const [cookie, setCookie] = useCookies(["token", "NewUser", "Theme"]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    localStorage.clear();
    setCookie("token", null);
    setIsVisible(false); // دکمه بازگشت را فعال کنید
    setTheme(cookie.Theme);
    console.log(webApp);
    if (webApp) {
    console.log("it's ok");

      loginUser(webApp?.initData);
    }
  }, []);

  const loginUser = async (initData: string) => {
    try {
      const response = await loginWithTelegram(initData);
      console.log(response);
      
      if (response.isSuccess) {
        console.log("PreLoad");
        setCookie("NewUser", response.value.isNew);
        console.log("NewUser", response.value.isNew);

        setCookie("token", response.value.token);
        localStorage.setItem("token", response.value.token);
        const totalDuration = 5000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
        const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
        const steps = totalDuration / increment;
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          setProgress((currentStep / steps) * 100);

          if (currentStep >= steps) {
            clearInterval(timer);
            if (response.value.isNew == true) {
              router.push("/panel/home");
            } else {
              router.push("/welcome");
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
            className="progress progress-success w-56"
            value={progress}
            max="100"
          ></progress>
          <span>V : 0.0.2</span>
        </div>
      </main>
    </div>
  );
}
