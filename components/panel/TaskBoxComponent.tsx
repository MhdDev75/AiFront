import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
export interface inlineBoxProps {
    title: string,
    description: string,
    image: string,
    price: number,
    status: boolean,
    currency: string

}

const TaskBoxComponent = ({ title, description, image, price, status , currency }: inlineBoxProps) => {
    const t = useTranslations("i18n")
    return (
        <button disabled={status} className='card btn btn-lg shadow-2xl  bg-base-300  flex flex-row flex-nowrap justify-between items-center p-2 rounded-full'>
            <div className='flex gap-3'>
                <div className={`flex bg-gradient-to-b from-warning to-info rounded-full p-2 justify-center items-center shadow-md shadow-neutral`}>
                    <Image src={image} alt={title} width={30} height={30}></Image>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <span className='text-sm'>{title}</span>
                    <span className='text-xs text-opacity-70'>{description}</span>
                </div>
            </div>
            <div>
                <span className={`btn btn-xs border-yellow-500 bg-base-100 text-xs text-nowrap  rounded-full`}>+ {price.toLocaleString()} {t(currency)}</span>
            </div>
        </button>
    )
}

export default TaskBoxComponent