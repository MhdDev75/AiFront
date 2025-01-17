import { User2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export interface inlineBoxProps {
    title: string,
    date: string,
    image: string,
    price: number,
    status: string,
    currency: string
}

const InvitedBoxComponent = ({ title, date, image, price, status, currency }: inlineBoxProps) => {
    // const t = useTranslations("i18n")
    return (
        <div className='card bg-base-300 shadow flex flex-row flex-nowrap justify-between items-center p-2 rounded-full'>
            <div className='flex gap-2'>
                <div className={`${status == "موفق" ? 'bg-success' : 'bg-error'} h-14 w-14 rounded-full  flex justify-center items-center`}>
                    {image ?
                        <Image width="56" height="56" src={image} alt='UserImage' className='rounded-full' /> :
                        <User2 />
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <span>{title}</span>
                    <span className='text-sm text-secondary'>{date}</span>
                </div>
            </div>
            <div>
                <span className={`text-success text-md text-nowrap font-bold px-3 `}>{(price).toLocaleString()} {currency}</span>
            </div>
        </div>
    )
}

export default InvitedBoxComponent