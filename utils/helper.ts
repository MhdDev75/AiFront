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



