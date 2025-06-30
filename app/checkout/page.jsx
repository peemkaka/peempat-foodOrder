"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import GlobalApi from "../../utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { CartUpdateContext } from "../../context/CartUpdateContext";
import { toast } from "sonner";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Loader } from "lucide-react";
function Checkout() {
  const params = useSearchParams();
  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubtotal] = useState(0);
  const [deliveryAmount, setDeliveryAmount] = useState(5);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetUserCartHandler(user.primaryEmailAddress.emailAddress);
    }
  }, [user, updateCart]);

  const GetUserCartHandler = async (email) => {
    try {
      const res = await fetch(`/api/cart?email=${encodeURIComponent(email)}`);
      const resp = await res.json();
      if (resp && resp.userCarts) {
        setCart(resp.userCarts);
        calculateTotalAmount(resp.userCarts);
      } else {
        setCart([]);
        setSubtotal(0);
        setTaxAmount(0);
        setTotal(0);
      }
    } catch (error) {
      setCart([]);
      setSubtotal(0);
      setTaxAmount(0);
      setTotal(0);
    }
  };

  const calculateTotalAmount = (cart_) => {
    let total = 0;
    cart_.forEach((item) => {
      return (total = total + item.price);
    });
    setSubtotal(total.toFixed(2));
    setTaxAmount(total * 0.09);
    setTotal(total + total * 0.09 + deliveryAmount);
  };

  const addToOrder = async () => {
    setIsLoading(true);
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      orderAmount: total,
      restaurantName: params.get("restaurant"),
      userName: userName,
      phone: phone,
      address: address,
      zipCode: zip,
    };

    try {
      // สร้าง order ใหม่
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const resp = await res.json();
      const resultId = resp?.createOrder?.id;
      
      if (resultId) {
        // เพิ่ม order item ทีละชิ้น
        for (const item of cart) {
          const itemRes = await fetch("/api/order", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: item.productName,
              price: item.price,
              id: resultId,
              email: data.email,
            }),
          });
          
          if (!itemRes.ok) {
            throw new Error(`Failed to add item: ${item.productName}`);
          }
        }
        
        // ลบ cart หลังจาก order สำเร็จ
        await fetch(`/api/order?email=${encodeURIComponent(data.email)}`, {
          method: "DELETE",
        });
        
        
        // ล้างข้อมูลในฟอร์ม
        setUserName("");
        setEmail("");
        setPhone("");
        setZip("");
        setAddress("");
        setCart([]);
        setSubtotal(0);
        setTaxAmount(0);
        setTotal(0);
        
        // อัพเดท state และแสดง toast
        setIsLoading(false);
        toast("Order Created Successfully!");
        setUpdateCart((prev) => !prev);
        
        // รอสักครู่แล้วค่อย redirect
        setTimeout(() => {
          router.push('/');
        }, 1500);
        
      } else {
        throw new Error("Failed to create order - no order ID returned");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      setIsLoading(false);
      toast("Error creating order: " + error.message);
    }
  };

  return (
    <div className=" container text-black mt-10">
      <div className="relative mx-auto w-full bg-white shadow-2xl">
        <div className="grid min-h-screen grid-cols-10">
          {/* Left Section */}
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Billing Details
                <span className="mt-2 block h-1 w-10 bg-primary sm:w-20"></span>
              </h1>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mt-2">
                    Name
                  </label>
                  <Input
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="name"
                    required
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mt-2">
                    Email
                  </label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.capler@fang.com"
                    required
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mt-2">
                    Phone
                  </label>
                  <Input
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    required
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mt-2">
                    Zip
                  </label>
                  <Input
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Zip"
                    required
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mt-2">
                    Address
                  </label>
                  <Input
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    required
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              {/* Add more form fields */}
              <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                By placing this order you agree to the{" "}
                <a
                  href="#"
                  className="whitespace-nowrap text-primary underline hover:text-primary"
                >
                  Terms and Conditions
                </a>
              </p>
              <button
                onClick={() => {
                  // Validate required fields
                  if (!userName || !email || !phone || !address || !zip) {
                    toast("Please fill in all required fields");
                    return;
                  }
                  
                  // Validate email format
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(email)) {
                    toast("Please enter a valid email address");
                    return;
                  }
                  
                  addToOrder();
                }}
                className="mt-4 inline-flex w-full items-center justify-center rounded hover:bg-primary/80 bg-primary py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-primary sm:text-lg"
                disabled={loading || cart.length === 0 || total <= 0}
              >
                {loading ? <Loader className="animate-spin" /> : "Make Payment"}
              </button>
              {/* <div className="mt-4">
                {total > 5 && (
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    disabled={!(userName && email && address && zip) || loading}
                    onApprove={async () => {
                      addToOrder(); // Call your original addToOrder function
                      GlobalApi.DeleteCartAfterPayment(
                        user?.primaryEmailAddress?.emailAddress
                      ); // Add this line to delete the cart after payment
                    }}
                    createOrder={(data, action) => {
                      return action.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: total.toFixed(2),
                              currency_code: "THB",
                            },
                          },
                        ],
                      });
                    }}
                  />
                )}
              </div> */}
            </div>
          </div>
          {/* Right Section */}
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-primary to-primary "></div>
            </div>
            <div className="relative">
              <div>
                <h2 className="flex text-2xl justify-center font-bold text-white">
                  Total Cart ({cart?.length})
                </h2>
              </div>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Sub Total: </span>
                  <span>{subTotal}฿</span>
                </p>
                <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                <p className="flex justify-between text-md font-medium text-white">
                  <span>Delivery: </span>
                  <span>{deliveryAmount}</span>
                </p>
                <p className="flex justify-between text-md font-medium text-white">
                  <span>Tax (9%): </span>
                  <span>{taxAmount.toFixed(2)}฿</span>
                </p>
              </div>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span>{total.toFixed(2)}฿</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const WrappedCategoryList = () => (
  <Suspense fallback={<div>Loading categories...</div>}>
    <Checkout />
  </Suspense>
);

export default WrappedCategoryList;
