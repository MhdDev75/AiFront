"use client"
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/assets/images/icon-ai.gif";
import { useTranslations } from "next-intl";



export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const t = useTranslations("i18n")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(['token'])
  useEffect(() => {
    // setIsVisible(false); // دکمه بازگشت را فعال کنید
    const totalDuration = 10000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
    const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
    const steps = totalDuration / increment;

    setCookie("token", "sssss")

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        router.push("/panel/home"); // هدایت به صفحه اصلی
      }
    }, increment);

    return () => clearInterval(timer); // پاکسازی تایمر
  }, [router]);

  // const setCookies = async()=>{
  //   (await cookies()).set("token","ajsdasldjalksdjasd")
  // }

  return (
    <div className="flex flex-col h-screen main-div">
      <main className="container relative flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-3  h-full justify-center items-center">
          <span className="relative flex justify-center items-center h-52 w-52">
            <Image src={icon} alt="welcome" width={120} />
            <span className=" absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-3/4 w-3/4 rounded-full bg-base-300 opacity-25"></span>
            <span className=" absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-4/4 w-4/4 rounded-full bg-base-300 opacity-35"></span>
            <span className="animate-ping absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0  h-3/4 w-3/4  rounded-full bg-base-300 opacity-35"></span>
          </span>
          <h1 className="text-2xl text-white font-extrabold text-center">
            {t("welcome")}
          </h1>
          <progress className="progress progress-success w-56" value={progress} max="100"></progress>
        </div>
      </main>
    </div>
  );
}