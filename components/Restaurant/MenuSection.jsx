import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { SquarePlus } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/utils/GlobalApi';
import { toast } from 'sonner';
import { CartUpdateContext } from '@/context/CartUpdateContext';

function MenuSection({ restaurant }) {
  const [menuItemList, setMenuItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {updateCart,setUpdateCart} = useContext(CartUpdateContext);

  useEffect(() => {
    restaurant?.menu && FilterMenu(restaurant?.menu[0]?.category);
  }, [restaurant]);

  const FilterMenu = (category) => {
    console.log('Selected category:', category);
    const result = restaurant?.menu?.filter((item) => item.category === category);
    setMenuItemList(result[0]);
    console.log('Filtered menu items:', result);
  };

  const addToCartHandler = async (item) => {
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      productName: item?.name,
      productDescription: item?.description,
      productImage: item?.productImage?.url,
      price: item?.price,
      restaurantSlug: restaurant.slug,
    };

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setUpdateCart(!updateCart);
        toast.success("Added to Cart");
      } else {
        toast.error("Error while adding to the cart");
      }
    } catch (error) {
      console.error("AddToCart Error:", error);
      toast.error("Error while adding to the cart");
    }
  };
  
  return (
    <div>
      <div className="grid grid-cols-4 mt-2">
        <div className="hidden md:flex flex-col mr-10 gap-2">
          {restaurant?.menu?.map((item, index) => (
            <Button
              className="flex justify-start"
              key={index}
              onClick={() => FilterMenu(item.category)} // Pass category correctly
            >
              {item.category}
            </Button>
          ))}
        </div>
        <div className="md:col-span-3 col-span-4">
          <h2 className="font-extrabold text-lg">{menuItemList.category}</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {menuItemList?.menuItem &&
              menuItemList?.menuItem.map((item, index) => (
                <div
                  key={item.id || index} // Ensure a unique key (preferably a unique ID if available)
                  className="p-2 flex gap-4 border-2 rounded-xl items-center hover:border-primary "
                >
                  {item?.productImage?.url ? (
                    <Image
                      src={item?.productImage?.url}
                      alt={item.name || 'product'}
                      width={120}
                      height={120}
                      className="object-cover w-[120px] h-[120px] rounded-lg"
                    />
                  ) : (
                    <div className="h-[120px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
                  )}
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <h2>{item.price}</h2>
                    <h2 className="text-sm text-gray-500 line-clamp-2">{item.description}</h2>
                    {user&&<SquarePlus
                      className={`cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                      onClick={() => addToCartHandler(item)}
                    />}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuSection;
