"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Ham, Search, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { CartUpdateContext } from "../context/CartUpdateContext";
import GlobalApi from "../utils/GlobalApi";
import Cart from "../components/Cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext); // Context to trigger cart update
  const [cart, setCart] = useState([]); // State to hold cart data

  useEffect(() => {
    const fetchUserCart = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      try {
        const res = await fetch(
          `/api/cart?email=${encodeURIComponent(
            user.primaryEmailAddress.emailAddress
          )}`
        );
        const data = await res.json();
        setCart(data.userCarts || []);
      } catch (error) {
        setCart([]);
      }
    };
    fetchUserCart();
  }, [user, updateCart]); // เพิ่ม updateCart เพื่อ refresh เมื่อมีการเปลี่ยนแปลง

  return (
    <div className="p-6 md:px-20 shadow-md w-full bg-primary">
      <div className="container flex justify-between items-center gap-4">
        <Link href={"/"} className="flex items-center gap-4">
          <div className="text-sencondary cursor-pointer">
            <Ham />
          </div>
          <div className="cursor-pointer">
            <h1 className="text-3xl font-bold">
              Food<span className="text-secondary">Order</span>
            </h1>
          </div>
        </Link>
        {isSignedIn ? (
          <div className="flex items-center gap-4 cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex gap-4 items-center ">
                  <ShoppingCart />
                  <label className="p-1 px-5 rounded-full bg-slate-200 text-primary font-semibold">
                    {cart.length}
                  </label>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <Cart cart={cart} />
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex">
                <UserButton />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"user"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton>Logout</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="gap-4 flex">
            <SignInButton mode="modal">
              <Button className="bg-accent hover:bg-accent-HOVER text-primary rounded">
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-white text-primary rounded hover:bg-gray-200">
                Sign up
              </Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
