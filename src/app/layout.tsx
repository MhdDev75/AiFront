import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";
import "./globals.css";
import { I18nProvider } from "@/core/i18n/provider";
import { getLocale } from "next-intl/server";
import { locales } from "@/core/i18n/config";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import { PropsWithChildren, Suspense } from "react";
import Loading from "./loading";
import Header from "./header";
import Footer from "./footer";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { TelegramProvider } from "@/core/telegram/TelegramProvider";
import { BackButtonProvider } from "@/components/telegram/Page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const iranSans = localFont({
  src: "./fonts/IRANSans.woff2",
  style: "bold",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Ai Studio",
  description: "a platform for growing by Ai",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const theme = (await cookies()).get("Theme");
  console.log(theme);

  const locale = await getLocale();
  return (
    <html lang={locale} className={theme?.value}>
      <body
        dir={locale == locales[0] ? "rtl" : "ltr"}
        className={`${
          locale == locales[0] ? iranSans.className : geistSans.variable
        }   antialiased`}
      >
        <TelegramProvider>
          <BackButtonProvider>
            <I18nProvider>
              <div className="flex flex-col h-screen main-div">
                <Header />
                <main className="relative flex-1 overflow-y-auto">
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                  <Toaster dir="rtl" position="top-center" richColors />
                </main>
                <Footer />
              </div>
            </I18nProvider>
          </BackButtonProvider>
        </TelegramProvider>
      </body>
      <GoogleAnalytics gaId="G-286074ML3H" />
    </html>
  );
}
