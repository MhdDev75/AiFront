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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram?.WebApp;
    if (app) {

      if (isVisible) {
        app.BackButton.show();
      } else {
        app.BackButton.hide();
      }

      app.BackButton.onClick(() => {
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
