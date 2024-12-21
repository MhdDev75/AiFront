"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import iconLight from "../assets/images/Ai_Studio-light.svg";
import iconDark from "../assets/images/Ai_Studio-dark.svg";
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
      <main className="container relative flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-3   overflow-hidden h-full justify-center items-center">
          <span className="relative flex justify-center items-center ">
            <Image src={theme === "light" ? iconLight : iconDark} alt="welcome" width={80} />
            <span className="absolute -z-10  shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-36 w-36 rounded-full  bg-neutral opacity-35"></span>
            <span className=" absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-44 w-44 rounded-full  bg-neutral opacity-25"></span>
            <span className="animate-ping absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0  h-36 w-36   rounded-full  bg-neutral opacity-35"></span>
          </span>
        </div>
      </main>
    </div>
  )
}
