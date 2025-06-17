"use client";
import "./globals.css";
import '@smastrom/react-rating/style.css'
import React, { useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import Header from "@/components/Header";
import { CartUpdateContext } from "@/context/CartUpdateContext";
import { Toaster } from "@/components/ui/sonner";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// Set up the custom font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export default function RootLayout({ children }) {
  const [updateCart, setUpdateCart] = useState([]);
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <PayPalScriptProvider options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          currency: 'THB'  // Add the currency here
        }}>
        {/* The html and body tags are now included correctly here */}
        <html lang="en">
          <body className={`${jetbrainsMono.variable} min-h-screen mb-20`}>
            {/* Providing context and rendering header */}
            <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
              <Header />
              <Toaster />
              {children}
            </CartUpdateContext.Provider>
          </body>
        </html>
      </PayPalScriptProvider>
    </ClerkProvider>
  );
}
