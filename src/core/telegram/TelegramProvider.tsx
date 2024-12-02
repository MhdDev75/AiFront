/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ITelegramUser, IWebApp } from "@/lib/type";
import Script from "next/script";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram?.WebApp;
    console.log("app", app);

    if (app) {
      app.platform !== "tdesktop" && app.requestFullscreen();



      app.enableClosingConfirmation();
      app.ready();
      setWebApp(app);
    }
  }, []);

  // Add more properties based on your needs

  const value = useMemo(() => {
    const themeParams = webApp?.themeParams;
    if (themeParams) {
      document.documentElement.style.setProperty(
        "--background",
        themeParams.bg_color
      );
      document.documentElement.style.setProperty(
        "--foreground",
        themeParams.text_color
      );
      document.documentElement.style.setProperty(
        "--primary",
        themeParams.button_color
      );
      document.documentElement.style.setProperty(
        "--secondary",
        themeParams.secondary_bg_color
      );

      // تنظیم فاصله‌های امن محتوا
      const insets = webApp?.contentSafeAreaInset;

      document.documentElement.style.setProperty('--inset-top', `${insets.top > 0 ? insets.top + 30 : insets.top}px`);
      document.documentElement.style.setProperty('--inset-bottom', `${insets.bottom > 0 ? insets.bottom + 30 : insets.bottom}px`);
      document.documentElement.style.setProperty('--inset-left', `${insets.left > 0 ? insets.left + 30 : insets.left}px`);
      document.documentElement.style.setProperty('--inset-right', `${insets.right > 0 ? insets.right + 30 : insets.right}px`);
    }
    return webApp
      ? {
        webApp,
        unsafeData: webApp.initDataUnsafe,
        user: webApp.initDataUnsafe.user,
      }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
