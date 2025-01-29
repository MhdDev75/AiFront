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
    loginUser()
  }, []);



  const getUserRegionclient = async () => {
    const response = await getUserRegion();
    if (response.isSuccess) {
      if (response.value.Id == 1) {
        setRegion("fa")
        localStorage.setItem("Region", "FA");
      } else {
        setRegion("en")
        localStorage.setItem("Region", "EN");
      }
    }
  }

  const loginUser = async () => {
    try {
      const app = (window as any).Telegram?.WebApp;
      //const response = await loginWithTelegram("query_id=AAGup4t6AgAAAK6ni3q0ggRB&user=%7B%22id%22%3A6350940078%2C%22first_name%22%3A%22Mhd%22%2C%22last_name%22%3A%22bus%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FciJ80wJsHBif2qtdCt_qxIvhx29_3NL0Y1dPOMxh89z2e0U9jAuqOILW_lRvAokq.svg%22%7D&auth_date=1733768266&signature=V4iu8CF38EIvH6h-F_Og6cCR2NtziayXDq8tptZWImYfHs3AgOXqO1Zchi0smG7nEfqy-r5gbELu6LpTMeqWCA&hash=b1d9e3da0f79060c38e92ce1bb2c88f8f15af4d2e0c1786850124bad063d2878");
      const response = await loginWithTelegram(app.initData);

      if (response.isSuccess) {
        setCookie("NewUser", response.value.isNew);
        setCookie("token", response.value.token);
        getUserRegionclient()
        localStorage.setItem("token", response.value.token);
        const totalDuration = 3000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
        const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
        const steps = totalDuration / increment;
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          setProgress((currentStep / steps) * 100);

          if (currentStep >= steps) {
            clearInterval(timer);
            if (response.value.isNew == false) {
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
