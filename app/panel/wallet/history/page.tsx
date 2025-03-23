/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getPaymentRequests } from '@/api/walletActions';
import { useBackButton } from '@/core/telegram/BackButtonProvider';
import { IPayments } from '@/lib/type';
import { ReceiptIcon, ReceiptText } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const HistoryPage = () => {

    const [cookie, setCookie] = useCookies(["Theme", "Region"])
    const [theme, setTheme] = useState("dark");
    const { setIsVisible } = useBackButton();
    const [loading, setLoading] = useState(false)
    const [transactionServer, setTransactionServer] = useState<IPayments[]>()

    useEffect(() => {
        setIsVisible(true); // دکمه بازگشت را فعال کنید
        setTheme(cookie.Theme)
        getPaymentRequestsClient()
    }, [cookie.Theme])

    const getPaymentRequestsClient = async () => {
        setLoading(true);

        const response = await getPaymentRequests();
        if (response.isSuccess) {

            const processedData =
                response.value.map(async (item: IPayments) => {
                    return { ...item, dateString: ConvertDate(item.issueDate) }
                })
            Promise.all(processedData).then((processedData) => {
                setTransactionServer(processedData)
            })


            setLoading(false)
        }
        else {
            toast.error(response.message)
            setLoading(false)
        }
    };

    const ConvertDate = (date: Date) => {
        const reg = cookie.Region
        const currentDate = new Date(date)
        if (reg && reg == "fa") {
            return new Intl.DateTimeFormat("fa-IR").format(currentDate)
        } else {
            return currentDate.toLocaleDateString()
        }
    }
    return (
        <section className="flex flex-col h-full gap-2 pb-4">
            {!loading && transactionServer?.map((item, index) => (
                <div key={index} className='card bg-base-300 shadow flex flex-row justify-between items-center p-2 rounded-full'>
                    <div className='grid grid-cols-3  justify-between w-full items-center p-2'>
                        <div className='flex gap-4 col items-center'>
                            {item.receiptType == "متن" ? (<ReceiptText />) : (<ReceiptIcon />)}
                            <div className='flex flex-col gap-2'>
                                <span className='text text-sm'>{item.receiptType}</span>
                                <span className='text-sm text-purple-500'>{item.dateString}</span>
                            </div>
                        </div>
                        <div className='font-bold text-center '>
                            {item.amount.toLocaleString()}
                        </div>
                        <div className='text text-sm text-end text-purple-500'>
                            {item.status}
                        </div>
                    </div>

                </div>
            ))}
            
        </section>
    )
}

export default HistoryPage