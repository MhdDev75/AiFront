"use client"
import { getRegion, postUserRegion } from '@/api/userActions'
import { setLocale } from '@/core/i18n/locale'
import { Locale } from '@/core/i18n/types'
import { IRegion } from '@/lib/type'
import { setRegion } from '@/utils/helper'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const RegionPage = () => {
    const router = useRouter()

    useEffect(() => {
        getRegionClient()
    }, [])

    const [isActive, setIsActive] = useState<number>(1)
    const [loading, setLoading] = useState(false)
    const [regionServer, setRegionServer] = useState<IRegion[]>()
    const handleRegion = () => {
        if (regionServer) {
            const regionName = isActive == 1 ? "Fa" : "En"

            if (regionName) {
                postRegion(regionName)
            }
        }

    }

    const getRegionClient = async () => {
        setLoading(true);
        const response = await getRegion();
        if (response.isSuccess) {
            setRegionServer(response.value)
            setLoading(false)
        }
        else {
            toast.error(response.message)
            setLoading(false)
        }
    };
    const postRegion = async (region: string) => {
        setLoading(true);
        const response = await postUserRegion(isActive);
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
                    {regionServer && regionServer.map((item) => (
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