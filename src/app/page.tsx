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
        const totalDuration = 10000; // مدت زمان نمایش صفحه فرود در میلی‌ثانیه (اینجا 3 ثانیه)
        const increment = 100; // هر چند میلی‌ثانیه یک بار پیشرفت نوار به‌روز شود
        const steps = totalDuration / increment;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            setProgress((currentStep / steps) * 100);

            if (currentStep >= steps) {
                clearInterval(timer);
                router.push('/home'); // هدایت به صفحه اصلی
            }
        }, increment);

        return () => clearInterval(timer); // پاکسازی تایمر
    }, [router]);

    return (
        <div style={styles.container}>
            <BotIcon size={200} />
            <h1 className='text-2xl text-center'>{t("welcome")}</h1>
           
            <div style={styles.progressBarContainer}>
                <div className='bg-primary ' style={{ ...styles.progressBar, width: `${progress}%` }} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100bvh',
        textAlign: 'center',
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
