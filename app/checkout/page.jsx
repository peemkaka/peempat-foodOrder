"use client";
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input'
import GlobalApi from '@/utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { CartUpdateContext } from '@/context/CartUpdateContext';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
function Checkout() {
  const params = useSearchParams();
  const { user } = useUser();
  const { updateCart,setUpdateCart } = useContext(CartUpdateContext);
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

  const [loading,setIsLoading] = useState(false);


  useEffect(() => {
    console.log(params.get('restaurant'))
    user && GetUserCartHandler(user?.primaryEmailAddress?.emailAddress);
  }, [user || updateCart])

  const GetUserCartHandler = (email) => {
    GlobalApi.GetUserCart(email)
      .then((resp) => {
        console.log('Fetched cart:', resp);
        if (resp && resp.userCarts) {
          setCart(resp.userCarts);  // Update the cart state with the fetched data
          calculateTotalAmount(resp.userCarts);
        } else {
          console.log('No cart data found');
        }
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });

  };

  const calculateTotalAmount = (cart_) => {
    let total = 0
    cart_.forEach((item) => {
      return total = total + item.price;
    })
    setSubtotal(total.toFixed(2))
    setTaxAmount(total * 0.09);
    setTotal(total + total * 0.09 + deliveryAmount)
  }

  const addToOrder = () => {
    setIsLoading(true)
    const data = {
      email:email,
      orderAmount:total,
      restaurantName:params.get('restaurant'),
      userName:userName,
      phone:phone,
      address:address,
      zipCode:zip
    }
    // console.log(data)
    GlobalApi.CreateNewOrder(data).then(resp=>{
      const resultId = resp?.createOrder?.id;
      if(resultId){
        cart.forEach((item)=>{
          return GlobalApi.UpdateOrderToAddOrderItems(item.productName,item.price,resultId,email).then(result=>{
            console.log(result)
            setIsLoading(false)
            toast('Order Created Successfully')
            setUpdateCart(!updateCart)
          })
        })
      }
    },(error)=>{
      setIsLoading(false)
    })
  }

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
              <div className='flex flex-col gap-2'>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mt-2">Name</label>
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
                <a href="#" className="whitespace-nowrap text-primary underline hover:text-primary">
                  Terms and Conditions
                </a>
              </p>
              <button
                onClick={() => addToOrder()}
                className="mt-4 inline-flex w-full items-center justify-center rounded hover:bg-primary/80 bg-primary py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-primary sm:text-lg"
              >
                { loading ? <Loader className='animate-spin'/> : 'Make Payment'}
              </button>
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
