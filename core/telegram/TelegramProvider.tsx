/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ITelegramUser, IWebApp } from "../../lib/type";
import Script from "next/script";
import { useCookies } from "react-cookie";

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
  const [cookie, setCookie] = useCookies(["Theme"]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram?.WebApp;
    console.log("app", app);

    if (app) {
      // app.platform !== "tdesktop" && app.requestFullscreen();
      if (!cookie.Theme) {
        console.log(app.colorScheme);
        setCookie("Theme", app.colorScheme )
      }
      app.requestFullscreen();
      app.disableVerticalSwipes();
      app.enableClosingConfirmation();
      app.ready();
      setWebApp(app);
    }
  }, []);

  // Add more properties based on your needs

  const value = useMemo(() => {
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
