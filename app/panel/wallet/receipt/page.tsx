"use client"
import { locales } from '@/core/i18n/config'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ReceiptPage = () => {

  const [isActive, setIsActive] = useState<number | null>(1)
  const [type, setType] = useState("value")
  const [input, setInput] = useState<string>("")
  const local = useLocale()
  const router = useRouter()
  const t = useTranslations("i18n")

  const topUpList = [
    { id: 1, price: 10000 },
    { id: 2, price: 20000 },
    { id: 3, price: 30000 },
    { id: 4, price: 40000 },
    { id: 5, price: 50000 },
    { id: 6, price: 60000 },
    { id: 7, price: 70000 },
    { id: 8, price: 80000 },
  ]


  const handelType = (input: string) => {
    setType(input)
    if (input == "value") {
      setIsActive(1);
      setInput("")
    }
    else {
      setIsActive(null);
      setInput("")
    }

  }

  const handleNavigate = () => {
    if (!isActive && !input) {
      toast.error("input filed required")
      return
    }
    let amount: string | undefined
    if (type == "value") {
      amount = topUpList.find(x => x.id === isActive)?.price.toString()
    }
    else {
      amount = input
    }
    if (local !== locales[0]) {
      toast.error("Not supported for your country.")
      return
    }

    router.push(`/panel/wallet/confirm?amount=${amount}`);
  };
  return (
    <div className='flex flex-col h-full gap-4'>
      <div className="collapse collapse-plus bg-base-200">
        <input onClick={() => handelType("value")} type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">{t("wallet.Value")}</div>
        <div className="collapse-content">
          <div className='grid grid-cols-4 gap-2'>
            {topUpList.map((item) => (
              <button onClick={() => setIsActive(item.id)} className={`btn btn-lg btn-primary ${isActive != item.id && "btn-outline"} btn-circle`} key={item.id}>
                {item.price.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input onClick={() => handelType("manual")} type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">{t("wallet.EnterAmount")}</div>
        <div className="collapse-content">
          <input type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("wallet.EnterYourAmount")}
            className="input input-bordered text-center rounded-full w-full max-w-xs" />
        </div>
      </div>
      <button onClick={() => handleNavigate()} className='btn btn-primary rounded-full'>{t("wallet.CreateReceipt")}</button>
    </div >
  )
}

export default ReceiptPage