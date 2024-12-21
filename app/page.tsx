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

export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["token", "NewUser", "Theme"]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setIsVisible(false); // دکمه بازگشت را فعال کنید
    const totalDuration = 4000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
    const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
    const steps = totalDuration / increment;

    loginUser();

   
    setTheme(cookie.Theme);
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

    return () => clearInterval(timer); // پاکسازی تایمر
  }, []);

  const loginUser = async () => {
    try {
      const initData =
        "query_id=AAGup4t6AgAAAK6ni3pZpJh5&user=%7B%22id%22%3A6350940078%2C%22first_name%22%3A%22Mhd%22%2C%22last_name%22%3A%22bus%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FciJ80wJsHBif2qtdCt_qxIvhx29_3NL0Y1dPOMxh89z2e0U9jAuqOILW_lRvAokq.svg%22%7D&auth_date=1732472944&signature=mtByBPfCq-P7bqp7RZIMuryMmK80CBBgIZJXKf48w_VGpHKXTOb0FVEnSgxOSJXSEwJjBsSlOvt4b0H7_-M1DQ&hash=597a567d4452e6f60abf3dac7e949c5f38fb1e673f877a5fea5e4d2a83de27a5";
      const response = await loginWithTelegram(initData);
      console.log(response);
      setCookie("token", response.value.token);
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
