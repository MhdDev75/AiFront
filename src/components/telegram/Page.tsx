"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean;
}>) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram?.WebApp;
  useEffect(() => {
    if (back) {
      app.BackButton.show();
    } else {
      app.BackButton.hide();
    }
  }, [back]);

  useEffect(() => {
    return app.BackButton.onClick(() => {
      router.back();
    });
  }, [router]);

  return <>{children}</>;
}
