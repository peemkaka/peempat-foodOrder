"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/utils/GlobalApi'
import Intro from '../../../components/Restaurant/Intro'
import { usePathname } from 'next/navigation'
import RestroTabs from '../../../components/Restaurant/RestroTabs'
const RestaurantDetails = () => {

  const param = usePathname();
  const [restaurant,setRestaurant] = useState([]);

  useEffect(()=>{
    const slug = param.split("/")[2];
    if (slug) {
      GetRestaurantDetail(slug);
    }
  },[])

  const GetRestaurantDetail = async (restroSlug) => {
    try {
      const resp = await GlobalApi.GetBusinessDetail(restroSlug);
      setRestaurant(resp.restaurant);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  return (
    <div className='w-full'>
        <div className='container text-black mt-5'>
          <Intro restaurant={restaurant} />
          <RestroTabs restaurant={restaurant}/>
        </div>
    </div>
  )
}

export default RestaurantDetails