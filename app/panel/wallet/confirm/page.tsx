/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, {  useEffect, useState } from 'react'
import chip from "@/assets/wallet/chip.png"
import Image from 'next/image';
import { UploadCloud } from 'lucide-react';
import { toast } from 'react-toastify';
import { postReceiptPayment } from '@/api/walletActions';
import { IReceiptPayment } from '@/lib/type';
import { useBackButton } from '@/core/telegram/BackButtonProvider';

const ConfirmPage = () => {
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount')?.toString();
    const router = useRouter()

    const [type, setType] = useState<"TEXT" | "IMAGE">("TEXT")
    const [input, setInput] = useState<string>()
    const [file, setFile] = useState<File>()


    const handelType = (input: "TEXT" | "IMAGE") => {
        setType(input)
        if (input == 'TEXT') {
            setFile(undefined)
        }
        else {
            setInput("")
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFileChange = (e: any) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            toast.success(`فایل ${e.target.files[0].name} انتخاب شد`);
        }
    };

    const handelClick = async () => {
        if (type ==="TEXT"  &&  (!input || input =="")) {
            toast.error("متن را وارد نمایید  فرمایید")
            return
        }

        if (type ==="IMAGE"  &&  (!file|| file ==undefined)) {
            toast.error("مقادیر ورودی را تکمیل فرمایید")
            return
        }

        const inputs: IReceiptPayment = { amount: Number(amount), text: input, type: type }
        const response = await postReceiptPayment(inputs, file)
        if (response.success) {
            toast.success("درخواست ارسال شد و پس از تایید به حساب شما واریز میشود")
            router.replace("/panel/wallet")
        }

    }
    const { setIsVisible } = useBackButton();

    useEffect(() => {
        setIsVisible(true); // دکمه بازگشت را فعال کنید
    }, [])
    return (
        <div className='flex flex-col  gap-4 overflow-y-auto'>
            <div className="card bg-base-300 h-48 shadow rounded-3xl">
                <div className="card-body p-2 text-center">
                    <div className='flex flex-col gap-4 h-full p-4 justify-center'>
                        <div className='text-sm'>شماره کارت جهت واریز</div>
                        <div className='flex flex-row flex-nowrap justify-between'>
                            <div className='text-start'>معمای بزرگ</div>
                            <Image src={chip} alt='Chip' width={35} height={35} />
                        </div>
                        <div className='text-2xl'>5022.8546.5589.1531</div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 justify-between bg-base-300 p-4 rounded-3xl'>
                <div className='text-start'>مبلغ واریز</div>
                <div className='text-end'>{Number(amount).toLocaleString()}</div>
            </div>
                <div className="collapse collapse-plus  bg-base-300">
                    <input onClick={() => handelType("TEXT")} type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title text-xl font-medium">متن</div>
                    <div className="collapse-content ">
                        <label className="form-control px-3">
                            <textarea value={input} onChange={(e) => setInput(e.target.value)}
                                className="textarea textarea-bordered h-16 w-full" placeholder="اطلاعات تراکنش را وارد  فرمایید"></textarea>
                        </label>
                    </div>
                </div>
                <div className="collapse collapse-plus bg-base-300">
                    <input onClick={() => handelType("IMAGE")} type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">عکس</div>
                    <div className="collapse-content">
                        <input type="file" id="file-input" onChange={() => handleFileChange} className="hidden" />
                        <label htmlFor="file-input" className="btn btn-outline h-auto flex flex-col gap-3 btn-primary p-3">
                            <UploadCloud size={40} />
                            <span className="file-text">برای اپلود فایل کلیک کنید</span>
                        </label>
                    </div>
                </div>
                <button onClick={()=>handelClick()} className='btn btn-primary rounded-3xl'>تایید و ارسال</button>
        </div>
    )
}

export default ConfirmPage