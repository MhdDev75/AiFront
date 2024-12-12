"use server"
import { cookies } from "next/headers";

export const changeTheme = async (theme: string) => {
  (await cookies()).set("Theme", theme);
};
