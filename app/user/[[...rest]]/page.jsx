"use client"
import { UserButton, UserProfile, useUser } from '@clerk/nextjs'
import { ShoppingBag } from 'lucide-react';
import React from 'react'
import MyOrders from "../../../components/MyOrders";

function User() {
    const { user, isSignedIn } = useUser();
  return (
    <div className='container mt-10 flex justify-center items-center'>
        {user && <UserProfile>
            <UserButton.UserProfilePage
              label="My Orders"
              labelIcon={<ShoppingBag className="h-5 w-5"/>}
              url="my-orders"
            >
                <MyOrders/>
            </UserButton.UserProfilePage>
          </UserProfile>}
    </div>
  )
}

export default User