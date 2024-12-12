import React from 'react'
import { Check, CircleUserIcon, MessageCircleQuestionIcon, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
export interface inlineBoxProps {
    title: string,
    date: string,
    icon: string,
    price: number,
    type: boolean,

}

const getIcon = (icon: string) => {
    switch (icon) {
        case "X":
            return <X />
        case "Check":
            return <Check />
        case "CircleUser":
            return <CircleUserIcon />
        default:
            return <MessageCircleQuestionIcon />
    }
}

const InlineBoxComponent = ({ title, date, icon, price, type }: inlineBoxProps) => {
    const t = useTranslations("i18n")
    return (
        <div className='card bg-base-300 shadow flex flex-row flex-nowrap justify-between items-center p-2 rounded-full'>
            <div className='flex gap-2'>
                <div className={`${type ? 'bg-success' : 'bg-error'} h-14 w-14 rounded-full  flex justify-center items-center`}>
                    {getIcon(icon)}
                </div>
                <div className='flex flex-col gap-2'>
                    <span>{title}</span>
                    <span className='text-sm text-secondary'>{date}</span>
                </div>
            </div>
            <div>
                <span className={`${type ? 'text-success' : 'text-error'} text-md text-nowrap font-bold px-3 `}>{(type ? "+" : "-") + " " + (price).toLocaleString()} {t("wallet.Currency")}</span>
            </div>
        </div>
    )
}

export default InlineBoxComponent