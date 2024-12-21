"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import iconLight from "@/assets/images/Ai_Studio-light.svg";
import iconDark from "@/assets/images/Ai_Studio-dark.svg";
import { useCookies } from 'react-cookie';

export default function Loading() {

  const [theme, setTheme] = useState("dark");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["Theme"])

  useEffect(() => {
    setTheme(cookie.Theme)
  }, [])

  return (
    <div className="flex flex-col h-screen main-div">
    <main className="container  mx-auto relative flex-1 overflow-y-auto px-4">
      <div className="flex flex-col gap-3   overflow-hidden h-full justify-center items-center">
        <span className="relative flex justify-center  items-center h-52 w-52">
          <Image
            src={theme === "light" ? iconLight : iconDark}
            alt="welcome"
            width={100}
          />
          <span className=" absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-3/4 w-3/4 rounded-full bg-neutral "></span>
          <span className=" absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-4/4 w-4/4 rounded-full bg-neutral opacity-35"></span>
          <span className="animate-ping absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0  h-3/4 w-3/4  rounded-full bg-neutral opacity-35"></span>
        </span>
      </div>
    </main>
  </div>
  )
}
