"use client"

import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import BusinessItem from './BusinessItem'
import BusinessSkeletion from './BusinessSkeletion'

const BusinessList = () => {
    const params = useSearchParams()
    const [category, setCategoryList] = useState('all');
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const categoryParam = params?.get('category') || 'all';
        setCategoryList(categoryParam);
        getBusinessList(categoryParam);
    }, [params]);

    const getBusinessList = async (category_) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/business?category=${category_}`);
            const resp = await res.json();
            if (resp?.restaurants) {
                setBusinessList(resp.restaurants);
            } else {
                setBusinessList([]);
            }
        } catch (error) {
            setBusinessList([]);
        }
        setLoading(false);
    };

    return (
        <div className='mt-2 container'>
            <h2 className='capitalize font-bold text-2xl'>Popular {category} Restuarants</h2>
            <h2 className='font-bold text-primary'>{businessList?.length ? businessList.length : '0'} Results</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-3'>
                {!loading ? businessList.map((restaurant, index) => {
                    return <BusinessItem business={restaurant} key={index} />
                })
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                        return <BusinessSkeletion key={index} />
                    })
                }
            </div>
        </div>
    )
}

const WrappedCategoryList = () => (
    <Suspense fallback={<div>Loading categories...</div>}>
        <BusinessList />
    </Suspense>
);

export default WrappedCategoryList;
