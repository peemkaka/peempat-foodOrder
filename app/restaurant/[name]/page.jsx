"use client"
import React, { useEffect, useState } from 'react'
import Intro from '../../../components/Restaurant/Intro'
import { usePathname } from 'next/navigation'
import RestroTabs from '../../../components/Restaurant/RestroTabs'

const RestaurantDetails = () => {
  const param = usePathname();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const slug = param.split("/")[2];
    if (slug) {
      GetRestaurantDetail(slug);
    }
  }, [param]);

  const GetRestaurantDetail = async (restroSlug) => {
    try {
      const res = await fetch(`/api/business/${restroSlug}`);
      const resp = await res.json();
      setRestaurant(resp.restaurant); // ปรับตามโครงสร้าง response ที่ backend ส่งกลับมา
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  if (!restaurant) return <div>Loading...</div>;

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