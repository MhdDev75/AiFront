"use client"
import InlineBoxComponent from '@/components/panel/InlineBoxComponent'
import { ArrowRightLeft, BackpackIcon, Banknote } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'

const WalletPage = () => {

    const router = useRouter();
    const t = useTranslations("i18n");
    const today = new Date();
    const dd = today.getDate() + 1;
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const friendList = [
        { id: 1, datetime: dd + '/' + mm + '/' + yyyy, name: "Ahmad Nori", gift: 50000, icons: "Check", type: true },
        { id: 2, datetime: dd + '/' + mm + '/' + yyyy, name: "Nazanin Shams", gift: 50000, icons: "Check", type: true },
        { id: 3, datetime: dd + '/' + mm + '/' + yyyy, name: "Mina Kaviyani", gift: 50000, icons: "Check", type: true },
        { id: 4, datetime: dd + '/' + mm + '/' + yyyy, name: "Goli Zarbaf", gift: 50000, icons: "X", type: false },
        { id: 5, datetime: dd + '/' + mm + '/' + yyyy, name: "Hassan Kargar", gift: 50000, icons: "Check", type: true },
        { id: 6, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000, icons: "Check", type: true },
        { id: 7, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000, icons: "X", type: false },
        { id: 8, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000, icons: "X", type: false }
    ]


    return (
        <div className='flex flex-col h-full gap-4'>
            <div className="card bg-base-300 h-52 shadow rounded-3xl">
                <div className="card-body p-2 text-center">
                    <div className='flex flex-col gap-2'>
                        <span className="text-sm">{t("wallet.TotalAssets")} ({t("wallet.Currency")})</span>
                        <span className="card-title text-3xl font-bold justify-center">{(1200000).toLocaleString()} </span>
                        <p className='text-success'> {t("wallet.Last")} {(1000).toLocaleString()} + </p>
                        <div className="card-actions justify-evenly">
                            <div className=' flex flex-col items-center gap-1'>
                                <button onClick={()=>router.push("/panel/wallet/receipt")} className="btn  rounded-full h-14 w-14  btn-primary animate-pulse">
                                    <Banknote color='white' />
                                </button>
                                <span className='font-bold text-primary'>
                                    {t("wallet.TopUp")}
                                </span>
                            </div>
                            <div className=' flex flex-col items-center gap-1'>
                                <button className="btn btn-success rounded-full h-14 w-14  ">
                                    <ArrowRightLeft />
                                </button>
                                <span className='font-bold'>
                                    {t("wallet.Transfer")}
                                </span>
                            </div>
                            <div className=' flex flex-col items-center gap-1'>
                                <button className="btn btn-error rounded-full h-14 w-14 ">
                                    <BackpackIcon />
                                </button>
                                <span className='font-bold'>
                                    {t("wallet.Withdraw")}
                                </span>
                            </div>
                            {/* <div className=' flex flex-col gap-1'>
                            <button disabled className="btn rounded-full h-14 w-14 ">
                                <Edit3 />
                            </button>
                            <span className=' textarea-disabled font-bold'>
                                More
                            </span>
                        </div> */}
                        </div>
                    </div>
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
                            icon={item.icons} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WalletPage