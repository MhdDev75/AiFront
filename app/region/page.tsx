"use client"
import { postUserRegion } from '@/api/userActions'
import { setLocale } from '@/core/i18n/locale'
import { Locale } from '@/core/i18n/types'
import { setRegion } from '@/utils/helper'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const RegionPage = () => {
    const router = useRouter()

    const region = [
        { id: 1, name: "English", value: "En" },
        { id: 2, name: "Europe", value: "En" },
        { id: 3, name: "Africa", value: "En" },
        { id: 4, name: "America", value: "En" },
        { id: 5, name: "Oceania", value: "En" },
        { id: 6, name: "Iran", value: "Fa" },
    ]

    const [isActive, setIsActive] = useState<number>(1)
    const [loading, setLoading] = useState(false)

    const handleRegion = () => {
        const regionTitle = region.find(item => item.id === isActive)?.name
        if (regionTitle) {
            postRegion(regionTitle)

        }
    }

    const postRegion = async (region: string) => {
        setLoading(true);
        const response = await postUserRegion(region);
        if (response.isSuccess) {
            setRegion(region)
            const locale = region.toLowerCase() as Locale;
            setLocale(locale);
            toast.success(response.message)
            router.push("/welcome")
            setLoading(false)
        }
        else {
            toast.error(response.message)
            setLoading(false)
        }
    };
    return (
        <div className="flex flex-col justify-center items-center h-screen main-div">
            <main className="container flex flex-col gap-3 justify-center items-center  mx-auto relative flex-1 overflow-y-auto px-4">
                <div className='grid grid-cols-3 gap-3'>
                    {region.map((item) => (
                        <button onClick={() => setIsActive(item.id)} className={`btn  ${item.id === isActive ? 'btn-outline btn-primary' : 'btn-outline'}`} key={item.id}>{item.name}</button>
                    ))}
                </div>
                <button onClick={() => handleRegion()} className="btn btn-primary">
                    {loading ? <span className="loading loading-spinner"></span> : ""}
                    Confirm</button>

            </main>
        </div>
    )
}

export default RegionPage