"use client"
import InlineBoxComponent from '../../../components/panel/InlineBoxComponent'
import { ArrowRightLeft, BackpackIcon, Banknote } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import iconLight from "../../../assets/images/Ai_Studio-light.svg";
import iconDark from "../../../assets/images/Ai_Studio-dark.svg";
import { useCookies } from 'react-cookie'
import Image from 'next/image'

const WalletPage = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie] = useCookies(["Theme"])
    const [theme, setTheme] = useState("dark");
    const router = useRouter();
    const t = useTranslations("i18n");
    const today = new Date();
    const dd = today.getDate() + 1;
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const friendList = [
        { id: 1, datetime: dd + '/' + mm + '/' + yyyy, name: "Ahmad Nori", gift: 50000, icons: "Check", type: true, currency: "Toman" },
        { id: 2, datetime: dd + '/' + mm + '/' + yyyy, name: "Nazanin Shams", gift: 50000, icons: "Check", type: true, currency: "Toman" },
        { id: 3, datetime: dd + '/' + mm + '/' + yyyy, name: "Mina Kaviyani", gift: 50000, icons: "Check", type: true, currency: "Toman" },
        { id: 4, datetime: dd + '/' + mm + '/' + yyyy, name: "Goli Zarbaf", gift: 50000, icons: "X", type: false, currency: "Toman" },
        { id: 5, datetime: dd + '/' + mm + '/' + yyyy, name: "Hassan Kargar", gift: 50000, icons: "Check", type: true, currency: "Toman" },
        { id: 6, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000, icons: "Check", type: true, currency: "Toman" },
        { id: 7, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000, icons: "X", type: false, currency: "Toman" },
        { id: 8, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000, icons: "X", type: false, currency: "Toman" }
    ]


    useEffect(() => {
        setTheme(cookie.Theme)
    }, [cookie.Theme])

    return (
        <div className='flex flex-col h-full gap-4'>
            <div className="card bg-base-300 shadow rounded-3xl overflow-hidden">
                <div className="card-body p-2 text-center">
                <div className='absolute end-2 top-2 opacity-35'>
                        <Image src={theme === "light" ? iconLight : iconDark} alt="welcome" width={30} />
                        </div>
                    <div className='flex flex-col gap-2'>
                       
                        <span className="text-sm">{t("wallet.TotalAssets")} ({t("wallet.Currency")})</span>
                        <span className="card-title text-3xl font-bold justify-center">{(1200000).toLocaleString()} </span>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between px-3'>
                <div className=' flex flex-col items-center gap-1'>
                    <button onClick={() => router.push("/panel/wallet/receipt")} className="btn btn-sm rounded-full h-12 w-12  btn-primary animate-pulse">
                        <Banknote size={40} />
                    </button>
                    <span className='font-bold text-sm '>
                        {t("wallet.TopUp")}
                    </span>
                </div>
                <div className=' flex flex-col items-center gap-1'>
                    <button className="btn btn-success rounded-full h-12 w-12 ">
                        <ArrowRightLeft size={40} />
                    </button>
                    <span className='font-bold text-sm'>
                        {t("wallet.Transfer")}
                    </span>
                </div>
                <div className=' flex flex-col items-center gap-1'>
                    <button className="btn btn-error rounded-full h-12 w-12 ">
                        <BackpackIcon size={40} />
                    </button>
                    <span className='font-bold text-sm'>
                        {t("wallet.Withdraw")}
                    </span>
                </div>
            </div>
            <div className='flex flex-col h-[calc(100%-14rem)] gap-3'>
                <span className='text-lg font-extrabold'>{t("wallet.Transaction")}</span>
                <div className='flex overflow-y-scroll flex-col gap-2'>

                    {friendList.map((item) => (
                        <InlineBoxComponent
                            key={item.id}
                            date={item.datetime}
                            price={item.gift}
                            title={item.name}
                            type={item.type}
                            icon={item.icons}
                            currency={item.currency} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WalletPage