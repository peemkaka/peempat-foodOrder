import GlobalApi from '@/utils/GlobalApi'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion"


function MyOrders() {
    const { user } = useUser()
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        user && GetUserOrders();
    }, [user])

    const GetUserOrders = async () => {
        try {
            const res = await fetch(`/api/order?email=${encodeURIComponent(user?.primaryEmailAddress.emailAddress)}`);
            const resp = await res.json();
            setOrderList(resp?.orders || []);
        } catch (error) {
            setOrderList([]);
        }
    };

    return (
        <div>
            <h2 className='font-bold text-lg'>My Orders</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {orderList.map((order, index) => {
                    return <div className='p-3 border rounded-xl' key={index}>
                        <h2 className='font-bold'>{moment(order?.createdAt).format('DD-MM-YYYY')}</h2>
                        <h2 className='flex justify-between'>Order Total Amount : <span>{(order.orderAmount).toFixed(2)}</span></h2>
                        <h2 className='flex justify-between'>Address : <span>{order.address}</span></h2>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger><h2 className='text-primary font-semibold'>View Order Detail</h2></AccordionTrigger>
                                <AccordionContent>
                                    <div className='flex flex-col gap-3'>
                                        {order?.orderDetail?.map((item,index)=>{
                                            return <div className='flex justify-between' key={index}>
                                                    <h2>{item.name}</h2>
                                                    <h2>{item.price}</h2>
                                                </div>
                                        })}
                                        <hr />
                                        <h2 className='font-bold'>Total Order Amount (Including Taxes + Delivery):{(order.orderAmount).toFixed(2)}</h2>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    </div>
                })}
            </div>
        </div>
    )
}

export default MyOrders