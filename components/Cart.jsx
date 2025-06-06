import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Button } from './ui/button'
import GlobalApi from '../utils/GlobalApi'
import { toast } from 'sonner'
import { CartUpdateContext } from '../context/CartUpdateContext'
import Link from 'next/link'

const Cart = ({cart}) => {
  const { updateCart ,setUpdateCart} = useContext(CartUpdateContext);
  const CalculateCartAmount =()=>{
    let total = 0;
    cart.forEach((item)=>{
      total = total + item.price;
    })
    return total
  }
  
  const RemoveItemFromCart =(id)=>{
    GlobalApi.DisconnectRestroFromUserCartItem(id).then(resp=>{
        console.log(resp);
        if(resp){
          GlobalApi.DeleteItemFromCart(id).then(resp=>{
            console.log(resp);
            toast('Order Remove!')
            setUpdateCart(!updateCart)
          })
        }
      }
    )
  }

  return (
    <div className='w-full'>
      <h2 className='text-lg font-bold text-black'>
        {cart[0]?.restaurant?.name}
      </h2>
      <div className='mt-5 flex flex-col gap-3'>
        <h2 className='font-bold text-black'>My Order</h2>
        {cart&&cart.map((item,index)=>{
          return <div className='flex justify-between gap-6 items-center' key={index}>
            <div className='flex gap-2 items-center cursor-default'>
             <Image src={item.productImage} alt={item.productName} width={30} height={40} 
             className='h-[40px] w-[40px] rounded-xl object-cover'/>
             <h2 className='text-sm text-black'>{item.productName}</h2>
            </div>
            <h2 className='font-bold flex gap-2 items-center text-black'>{item.price}฿
            <X className='h-4 w-4 text-red-500'
            onClick={()=>RemoveItemFromCart(item.id)}
            />
            </h2>
          </div>
        })}
        <Link href={'/checkout?restaurant='+cart[0]?.restaurant?.name}>
          <Button className="rounded-xl bg-primary text-white hover:text-black w-full">Check out ฿{CalculateCartAmount()}</Button>
        </Link>
      </div>
    </div>
  )
}

export default Cart