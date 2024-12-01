"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BotIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const LandingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const t = useTranslations("i18n");

  useEffect(() => {
    const totalDuration = 3000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
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
    <div
      className=' bg-center bg-no-repeat bg-cover bg-[url("/images/bg-ai.jpg")] bg-slate-900  shadow-slate-800'
      style={styles.container}
    >
      <div
        className="flex flex-col justify-center gap-2 items-center backdrop-blur-sm text-center  w-full"
        style={styles.container}
      >
        <div className="flex flex-col items-center gap-3 ">
          <BotIcon color="white" size={150} />
        </div>
        <div className="flex flex-col items-center gap-3 ">
          <span className="text-3xl font-extrabold text-white">The Ai Studio</span>
        </div>
        <div className="flex flex-col items-center gap-3 absolute bottom-24">
          <h1 className="text-lg text-white font-bold text-center">
            {t("welcome")}
          </h1>
          <div className="w-full" style={styles.progressBarContainer}>
            <div
              className="bg-primary "
              style={{ ...styles.progressBar, width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
  },
  progressBarContainer: {
    height: "10px",
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
