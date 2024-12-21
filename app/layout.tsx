import type { Metadata } from "next";
import { I18nProvider } from "@/core/i18n/provider";
import { getLocale } from "next-intl/server";
import { locales } from "@/core/i18n/config";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { ToastContainer, Zoom } from "react-toastify";

import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { TelegramProvider } from "@/core/telegram/TelegramProvider";
import { BackButtonProvider } from "@/core/telegram/BackButtonProvider";


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const iranSans = localFont({
  src: "../fonts/IRANSans.woff2",
  style: "bold",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get("Theme");
  const locale = await getLocale();

  return (
    <html lang={locale} data-theme={theme?.value ? theme?.value : 'dark'} className="h-full">
      <head><meta name="referrer" content="no-referrer" /></head>
      <body
        dir={locale == locales[0] ? "rtl" : "ltr"}
        className={`${locale == locales[0] ? iranSans.className : geistSans.variable
          }  antialiased`}
      >
        <TelegramProvider>
          <BackButtonProvider>
            <I18nProvider>
              {children}
            </I18nProvider>
          </BackButtonProvider>
        </TelegramProvider>
        <ToastContainer autoClose={2000}
          hideProgressBar={true}
          stacked
          newestOnTop={true}
          closeOnClick
          position="bottom-center"
          rtl={locale == locales[0] ? true : false}
          draggable
          pauseOnHover
          closeButton={false}
          className={`${locale == locales[0] ? iranSans.className : geistSans.variable}`}
          theme="colored"
          transition={Zoom}
        />
      </body>
    </html>
  );
}
