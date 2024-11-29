"use client"

import React from 'react'
import { Ham, Search } from 'lucide-react';
import { Button } from './ui/button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
const Header = () => {
    const { user , isSignedIn} = useUser();

    return (
        <div className='p-6 md:px-20 shadow-md w-full bg-primary'>
            <div className='container flex justify-between items-center gap-4'>
                <div className='flex items-center gap-4 '>
                    <div className='text-sencondary cursor-pointer'>
                        <Ham />
                    </div>
                    <div className='cursor-pointer'>
                        <h1 className='text-3xl  font-bold'>Food<span className='text-sencondary'>Order</span></h1>
                    </div>
                </div>
                <div className='hidden md:flex items-center border p-2 rounded bg-gray-200 w-96 '>
                    <input type="next" className='w-full bg-transparent outline-none text-primary text-xl' />
                    <button>
                        <Search className='text-sencondary ' />
                    </button>
                </div>
                { isSignedIn ? <div className='flex items-center'>
                    <UserButton/>
                </div>
                : <div className='gap-4 flex '>
                    <SignInButton mode='modal'>
                        <Button className="bg-accent hover:bg-accent-HOVER text-primary rounded">Login</Button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                        <Button className="bg-white text-primary rounded hover:bg-gray-200" >Sign up</Button>
                    </SignUpButton>
                </div>}
            </div>
        </div>
    )
}

export default Header