"use client"
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

interface BackButtonContextProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const BackButtonContext = createContext<BackButtonContextProps>({
  isVisible: false,
  setIsVisible: () => { },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BackButtonProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const { WebApp } = window.Telegram;

      if (isVisible) {
        WebApp.BackButton.show();
      } else {
        WebApp.BackButton.hide();
      }

      WebApp.BackButton.onClick(() => {
        if (isVisible) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          router.back();
        }
      });
    }
  }, [isVisible]);

  return (
    <BackButtonContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </BackButtonContext.Provider>
  );
};

export const useBackButton = () => useContext(BackButtonContext);
