"use client"
import { GetAiApplication } from '@/api/categoryActions';
import ApplicationLBoxComponent from '@/components/panel/ApplicationLBoxComponent';
import { useBackButton } from '@/core/telegram/BackButtonProvider';
import { IApplication } from '@/lib/type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SubCategoryAppPage = () => {

    const { setIsVisible } = useBackButton();
    const [loading, setLoading] = useState(false);
    const [application, setApplication] = useState<IApplication[]>();
    const params = useParams<{ id: string, name: string }>();
    useEffect(() => {
        if (params) {
            getData(params.id);
        }
        setIsVisible(true); // دکمه بازگشت را فعال کنید
    }, []);

    const getData = async (paramId: string) => {
        setLoading(true);
        const response = await GetAiApplication(paramId);
        if (response.isSuccess) {
            setApplication(response.value as IApplication[]);
            setLoading(false)
        }
    };

    return (
        <section className="h-full">
            {loading ?
                <>
                    <div className="grid grid-cols-2 gap-5">
                        <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
                        </div>
                        <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
                        </div>
                        <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
                        </div>
                        <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
                        </div>
                        <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
                        </div>
                        <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
                        </div>
                    </div>
                </>
                : <>
                    <h1 className="text-lg mb-3">{decodeURIComponent(params.name)}</h1>
                    <div className="grid grid-cols-2 gap-2">
                        {application && application?.map((item: IApplication, index) => (
                            <ApplicationLBoxComponent key={index} {...item} />
                        ))}
                    </div>
                </>}

        </section>
    );
};


export default SubCategoryAppPage