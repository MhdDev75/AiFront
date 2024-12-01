"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import icon from "@/assets/images/icon-ai.gif";
import { Page } from "@/components/telegram/Page";

const LandingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const t = useTranslations("i18n");

  useEffect(() => {
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
    <Page back={false}>
         <section className="px-5">
      <div
        className="h-screen bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        style={styles.container}
      >
        <div
          className="flex flex-col justify-center  gap-8 backdrop-blur-sm text-center"
          style={styles.container}
        >
          <span className="relative flex justify-center items-center ">
            <Image src={icon} alt="welcome" width={120} />
            <span className="absolute -z-10  shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-36 w-36 rounded-full bg-white opacity-35"></span>
            <span className=" absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-44 w-44 rounded-full bg-white opacity-25"></span>
            <span className=" absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-52 w-52 rounded-full bg-white opacity-35"></span>
            <span className="animate-ping absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0  h-36 w-36   rounded-full bg-white opacity-35"></span>
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
      </div>
      </section>
    </Page>
  );
};

const styles = {
  container: {
    height: "100vh",
  },
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
