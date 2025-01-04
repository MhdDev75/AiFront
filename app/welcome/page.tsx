"use client";
import React, { useEffect, useState } from "react";
// import slide1 from "@/assets/welcome/slide-1.webp";
// import slide2 from "@/assets/welcome/slide-2.webp";
// import slide3 from "@/assets/welcome/slide-3.webp";
// import slide4 from "@/assets/welcome/slide-4.webp";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { useCookies } from "react-cookie";
import { useLocale, useTranslations } from "next-intl";

const WelcomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["NewUser", "Theme", "Platform"]);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const { setIsVisible } = useBackButton();
  const t = useTranslations("i18n");
  const router = useRouter();
  const local = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const sliderList = new Array();

  useEffect(() => {
    sliderList.push({
      id: 1,
      imgUrl: `/assets/welcome/${local}-${cookie.Theme}-${
        cookie.Platform == "tdesktop" ? "d" : "m"
      }.mp4`,
      time: 15000,
    });

    setIsVisible(false); // دکمه بازگشت را فعال کنید
    const totalDuration = sliderList[current]?.time; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
    const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
    const steps = totalDuration / increment;

    let currentSteps = 0;
    const timer = setInterval(() => {
      currentSteps++;
      setCurrentStep(currentSteps);
      setProgress((currentSteps / steps) * 100);
      if (currentSteps >= steps) {
        clearInterval(timer);
        if (sliderList.length > current) {
          setCookie("NewUser", true);
          const a = document.createElement("a");
          a.href = `#slide${current + 2}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setCurrent(current + 1);
        }
      }
    }, increment);

    return () => clearInterval(timer); // پاکسازی تایمر
  }, [current]);

  return (
    <div className="flex flex-col h-screen main-div">
      <main className="relative flex-1 overflow-hidden">
        <div
          dir="ltr"
          className="carousel w-full h-dvh bg-base-100 overflow-hidden"
        >
          {sliderList.map((item) => (
            <div
              key={item.id}
              id={`slide${item.id}`}
              className="carousel-item relative w-full"
            >
              <video autoPlay src={item.imgUrl} className="w-full" />
            </div>
          ))}
          {current < sliderList.length && currentStep != 100 && (
            <progress
              className="absolute top-0 rounded-none mx-auto right-0 left-0 z-20 progress progress-primary w-full "
              value={progress}
              max="100"
            ></progress>
          )}
          {current == sliderList.length && (
            <button
              onClick={() => router.push("/panel/home")}
              className="btn btn-primary btn-md  mx-auto right-0 left-0 w-52 z-20 absolute bottom-10 text-2xl"
            >
              {t("LetsGo")}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
