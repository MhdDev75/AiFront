"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const ReloadPage = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col gap-5   h-full justify-center items-center">
            <h1 className='text-2xl'>اطلاعات شما بازیابی نشد </h1>
            <button onClick={() => router.push('/')} className='btn btn-primary'>
                بارگزاری مجدد
            </button>
        </div>
    )
}

export default ReloadPage