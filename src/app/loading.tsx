"use client"
import Image from 'next/image'
import React from 'react'
import icon from "@/assets/images/icon-ai.gif";

export default function Loading() {
  return (
    <section className='mx-5 flex flex-1 h-full items-center justify-center'>
     <span className="relative flex justify-center items-center ">
          <Image src={icon} alt="welcome" width={120} />
          <span className="absolute -z-10  shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-36 w-36 rounded-full bg-white opacity-35"></span>
          <span className=" absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-44 w-44 rounded-full bg-white opacity-25"></span>
          <span className=" absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-52 w-52 rounded-full bg-white opacity-35"></span>
          <span className="animate-ping absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0  h-36 w-36   rounded-full bg-white opacity-35"></span>
        </span>
    </section>
  )
}
