"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import icon from "@/assets/images/icon-ai.gif";
import { useBackButton } from "@/components/telegram/Page";

const LandingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();

  useEffect(() => {
    setIsVisible(false); // دکمه بازگشت را فعال کنید
    const totalDuration = 5000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
    const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
    const steps = totalDuration / increment;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        router.push("/welcome"); // هدایت به صفحه اصلی
      }
    }, increment);

    return () => clearInterval(timer); // پاکسازی تایمر
  }, [router]);

  return (
    <section className="px-5 h-full bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="h-full flex flex-col justify-center  items-center gap-1 backdrop-blur-sm text-center">
        <span className="relative flex justify-center items-center h-52 w-52">
          <Image src={icon} alt="welcome" width={120} />
          <span className=" absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-3/4 w-3/4 rounded-full bg-white opacity-25"></span>
          <span className=" absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-4/4 w-4/4 rounded-full bg-white opacity-35"></span>
          <span className="animate-ping absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0  h-3/4 w-3/4  rounded-full bg-white opacity-35"></span>
        </span>
        <h1 className="text-2xl text-white font-extrabold text-center">
          {t("welcome")}
        </h1>

        <div className="flex flex-col items-center justify-center w-full gap-3 absolute bottom-24 ">
          <div style={styles.progressBarContainer}>
            <div
              className="bg-primary "
              style={{ ...styles.progressBar, width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {

  progressBarContainer: {
    height: "10px",
    width: "50%",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    transition: "width 0.1s ease-in-out",
  },
};

export default LandingPage;
