"use server"
import { cookies } from "next/headers";

export const changeTheme = async (theme: string) => {
  (await cookies()).set("Theme", theme);
};

export const setPlatform = async (platform: string) => {
  (await cookies()).set("Platform", platform);
};

export const setRegion = async (region: string) => {
  (await cookies()).set("Region", region);
};

export const convertLocalizeDate = async (date: Date) => {
  const reg = (await cookies()).get("Region")
  console.log(reg);
  const currentDate = new Date(date)
  if (reg && reg.value == "fa") {
    return new Intl.DateTimeFormat("fa-IR").format(currentDate)
  } else {
    return currentDate.toLocaleDateString()
  }

};


