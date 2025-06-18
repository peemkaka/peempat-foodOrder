import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Intro = ({ restaurant }) => {
  const bannerUrl = restaurant?.banner?.url;
  const [totalRating, setTotalRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    if (restaurant?.slug) {
      fetchReviewList();
    }
  }, [restaurant?.slug]);

  const fetchReviewList = async () => {
    try {
      const res = await fetch(`/api/review/${restaurant.slug}`);
      const resp = await res.json();
      const reviews = resp?.reviews || [];
      let total = 0;
      let count = reviews.length;
      reviews.forEach((item) => {
        total += item.star;
      });
      setTotalRating(count);
      setAvgRating(count > 0 ? (total / count).toFixed(1) : 4.5);
    } catch (error) {
      setTotalRating(0);
      setAvgRating(4.5);
    }
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
