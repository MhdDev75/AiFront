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
import { useLocale } from "next-intl";
import Image from "next/image";

const WelcomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["NewUser", "Theme", "Platform"]);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const { setIsVisible } = useBackButton();
  const router = useRouter();
  const local = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  const sliderList = [
    {
      id: 1,
      imgUrl: `/assets/welcome/${local}-${cookie.Theme}-${
        cookie.Platform == "tdesktop" ? "d" : "m"
      }.webp`,
      time: 15000,
    },
  ];
  useEffect(() => {
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
      
      if (current === sliderList.length && progress === 100) {
        clearInterval(timer)
        router.push("/panel/home")
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
              <Image src={item.imgUrl} alt={`slide${item.id}`} className="w-full" />
            </div>
          ))}
          {current < sliderList.length && currentStep != 100 && (
            <progress
              className="absolute top-0 h-1 rounded-none mx-auto right-0 left-0 z-20 progress progress-primary w-full "
              value={progress}
              max="100"
            ></progress>
          )}
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
