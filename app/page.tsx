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

export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();

  const { webApp } = useTelegram();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["token", "NewUser", "Theme"]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setIsVisible(false); // دکمه بازگشت را فعال کنید
    const totalDuration = 4000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
    const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
    const steps = totalDuration / increment;

    if (webApp) {
      loginUser(webApp?.initData);

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setProgress((currentStep / steps) * 100);

        if (currentStep >= steps) {
          clearInterval(timer);
          if (cookie.NewUser == true) {
            router.push("/panel/home");
          } else {
            router.push("/welcome");
          }
        }
      }, increment);
      setTheme(cookie.Theme);
      return () => clearInterval(timer); // پاکسازی تایمر
    }
  }, []);

  const loginUser = async (initData: string) => {
    try {
      const response = await loginWithTelegram(initData);
      console.log(response);
      setCookie("token", response.value.token);
      setCookie("NewUser", response.value.isNew);
      localStorage.setItem("token", response.value.token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // const setCookies = async()=>{
  //   (await cookies()).set("token","ajsdasldjalksdjasd")
  // }

  return (
    <div className="flex flex-col h-screen main-div">
      <main className="container relative flex-1 overflow-y-auto px-4">
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
        </div>
      </main>
    </div>
  );
}
