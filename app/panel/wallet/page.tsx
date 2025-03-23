"use client"
import InlineBoxComponent from '@/components/panel/InlineBoxComponent'
import { ArrowRightLeft, BackpackIcon, Banknote, History } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import iconLight from "@/assets/images/Ai_Studio-light.svg";
import iconDark from "@/assets/images/Ai_Studio-dark.svg";
import { useCookies } from 'react-cookie'
import Image from 'next/image'
import { getBalance, getTransaction } from '@/api/walletActions'
import { toast } from 'react-toastify'
import { IBalance, ITransaction } from '@/lib/type'
import { useBackButton } from '@/core/telegram/BackButtonProvider'

const WalletPage = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie] = useCookies(["Theme", "Region"])
    const [theme, setTheme] = useState("dark");
    const router = useRouter();
    const t = useTranslations("i18n");

    const [loading, setLoading] = useState(false)
    const [balanceServer, setBalanceServer] = useState<IBalance>()
    const [transactionServer, setTransactionServer] = useState<ITransaction[]>()

    const { setIsVisible } = useBackButton();


    useEffect(() => {
        setIsVisible(true); // دکمه بازگشت را فعال کنید
        setTheme(cookie.Theme)
        getBalanceClient()
        getTransactionClient()
    }, [cookie.Theme])

    const getBalanceClient = async () => {
        setLoading(true);
        const response = await getBalance();
        if (response.isSuccess) {
            setBalanceServer(response.value)
            setLoading(false)
        }
        else {
            toast.error(response.message)
            setLoading(false)
        }
    };


    const getTransactionClient = async () => {
        setLoading(true);
        
        const response = await getTransaction();
        if (response.isSuccess) {
            response.value.map(async (item: ITransaction) => {
                item.icons = item.type == "پرداختی" ? "Check" : item.type == "GIFT" ? "GIFT"  : "X"

            })
            setTransactionServer(response.value)
            setLoading(false)
        }
        else {
            toast.error(response.message)
            setLoading(false)
        }
    };
    return (
        <div className='flex flex-col h-full gap-4'>
            <div className="card bg-base-300 shadow rounded-3xl p-2 overflow-hidden">
                <div className="card-body p-2 text-center">
                    <div className='absolute end-2 top-2 opacity-35'>
                        {loading ?
                            (<span className="loading loading-spinner"></span>) :
                            (<Image src={theme === "light" ? iconLight : iconDark} alt="welcome" width={30} />)}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className="text-sm">{t("wallet.TotalAssets")}
                            {balanceServer?.currency &&
                                "(" + t(`${balanceServer.currency}`) + ")"
                            } </span>
                        <span className="card-title text-3xl font-bold justify-center">{balanceServer ? (Number(balanceServer.amount)).toLocaleString() + " " : 0}  </span>
                    </div>
                    <div className='flex flex-row justify-start gap-2'>
                        {balanceServer?.firstName + " " + balanceServer?.lastName}
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between px-3'>
                <div className=' flex flex-col items-center gap-1'>
                    <button onClick={() => router.push("/panel/wallet/receipt")} className="btn btn-sm rounded-full h-12 w-12  btn-primary animate-pulse p-0">
                        <Banknote size={30} />
                    </button>
                    <span className='font-bold text-sm '>
                        {t("wallet.TopUp")}
                    </span>
                </div>
                <div className=' flex flex-col items-center gap-1'>
                    <button onClick={() => router.push("/panel/wallet/history")} className="btn btn-warning rounded-full h-12 w-12  p-0">
                        <History size={25} />
                    </button>
                    <span className='font-bold text-sm'>
                        {t("wallet.history")}
                    </span>
                </div>
                <div  className=' flex flex-col items-center gap-1'>
                    <button disabled className="btn btn-success rounded-full h-12 w-12  p-0">
                        <ArrowRightLeft size={25} />
                    </button>
                    <span className='font-bold text-sm'>
                        {t("wallet.Transfer")}
                    </span>
                </div>
                <div className=' flex flex-col items-center gap-1'>
                    <button disabled className="btn btn-error rounded-full h-12 w-12  p-0">
                        <BackpackIcon size={25} />
                    </button>
                    <span className='font-bold text-sm'>
                        {t("wallet.Withdraw")}
                    </span>
                </div>
            </div>
            <div className='flex flex-col h-[calc(100%-14rem)] gap-3'>
                <span className='text-lg font-extrabold'>{t("wallet.Transaction")}</span>
                <div className='flex overflow-y-scroll flex-col gap-2'>

                    {transactionServer && transactionServer.map((item, index) => (
                        <InlineBoxComponent
                            key={index}
                            date={item.transactionDate}
                            price={item.amount}
                            title={item.typeTitle}
                            type={item.type}
                            status={item.status}
                            icon={item.icons}
                            currency={item.currency} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WalletPage