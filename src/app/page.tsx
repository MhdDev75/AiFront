"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BotIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LandingPage: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const router = useRouter();
    const t = useTranslations("i18n")

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
                router.push('/welcome'); // هدایت به صفحه اصلی
            }
        }, increment);

        return () => clearInterval(timer); // پاکسازی تایمر
    }, [router]);

    return (
        <div className=' bg-center bg-no-repeat bg-contain bg-[url("/images/bg-ai.avif")]' style={styles.container}>
            <div className='flex flex-col justify-center gap-8 items-center text-center backdrop-blur-sm w-full'  style={styles.container}>
            <div className='flex flex-col items-center gap-3'>
                <BotIcon size={150} />
                <h1 className='text-lg text-center'>{t("welcome")}</h1>
            </div>

            <div style={styles.progressBarContainer}>
                <div className='bg-primary ' style={{ ...styles.progressBar, width: `${progress}%` }} />
            </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
    },
    progressBarContainer: {
        width: '80%',
        height: '60px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden',
        marginTop: '20px',
    },
    progressBar: {
        height: '100%',
        transition: 'width 0.1s ease-in-out',
    },
};

export default LandingPage;
