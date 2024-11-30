import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Intro = ({ restaurant }) => {
  const bannerUrl = restaurant?.banner?.url;
  const [totalRating, setTotalRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    if (restaurant && Array.isArray(restaurant.review)) {
      CalculateRating();
    }
  }, [restaurant]);

  const CalculateRating = () => {
    let total = 0;
    let count = 0;

    restaurant.review.forEach((item) => {
      total += item.star;
      count++;
    });

    setTotalRating(count);
    const result = count > 0 ? total / count : 0;
    setAvgRating(result ? result.toFixed(1) : 4.5);
  };

  return (
    <div>
      <div>
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            width={1080}
            height={300}
            className="w-full h-[220px] object-cover rounded-xl"
            alt={restaurant?.name || "Restaurant"}
          />
        ) : (
          <div className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
        )}
        <h2 className="text-3xl font-bold mt-2 ">{restaurant?.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <Image src={'/star.png'} alt="star" width={20} height={20} />
          <label className="text-sm text-gray-500">
            {avgRating} ({totalRating})
          </label>
        </div>
        <h2 className="text-gray-500 mt-2 flex gap-2 items-center xl:w-[70%]">
          <MapPin />
          {restaurant?.address}
        </h2>
      </div>
    </div>
  );
};

export default Intro;
