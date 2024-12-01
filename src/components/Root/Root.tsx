"use client";

import { type PropsWithChildren, useEffect } from "react";
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/telegram/ErrorBoundary";
import { ErrorPage } from "@/components/telegram/ErrorPage";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";
import { useClientOnce } from "@/hooks/useClientOnce";
// import { setLocale } from "@/core/i18n/locale";
import { init } from "@/core/init";


function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === "development";

  // Mock Telegram environment in development mode if needed.
  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === "debug";

  // Initialize the library.
  useClientOnce(() => {
    init(debug);
  });

  const isDark = useSignal(miniApp.isDark);
  // const initDataUser = useSignal(initData.user);

  const initDataRaw = useSignal(initData.raw);

  // Set the user locale.
  // useEffect(() => {
  //   initDataUser && setLocale(initDataUser.languageCode);
  // }, [initDataUser]);

  useEffect(() => {
    // if (initDataRaw ) {
     
    // const fetchUser = async () => {
    //   try {
    //     // let initData = "query_id=AAGup4t6AgAAAK6ni3pZpJh5&user=%7B%22id%22%3A6350940078%2C%22first_name%22%3A%22Mhd%22%2C%22last_name%22%3A%22bus%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FciJ80wJsHBif2qtdCt_qxIvhx29_3NL0Y1dPOMxh89z2e0U9jAuqOILW_lRvAokq.svg%22%7D&auth_date=1732472944&signature=mtByBPfCq-P7bqp7RZIMuryMmK80CBBgIZJXKf48w_VGpHKXTOb0FVEnSgxOSJXSEwJjBsSlOvt4b0H7_-M1DQ&hash=597a567d4452e6f60abf3dac7e949c5f38fb1e673f877a5fea5e4d2a83de27a5"
    //     // const userData = await loginUsers(initData);
    //     // localStorage.setItem('token', userData.access_token);
    //   } catch (err: any) {
    //     console.log(err.message);
    //   }
    // };

    // fetchUser();
    // }
  }, [initDataRaw]);

  // Enable debug mode to see all the methods sent and events received.
  // useEffect(() => {
  //   debug && import("eruda").then((lib) => lib.default.init());
  // }, [debug]);



  return (
      <AppRoot
        appearance={isDark ? "dark" : "light"}
        platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      >
        {children}
      </AppRoot>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount && (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) ;
}
