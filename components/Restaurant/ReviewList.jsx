import Image from 'next/image'
import React from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'
function ReviewList({ reviewList }) {
    return (
        <div className='flex flex-col gap-5'>
            {reviewList ? reviewList.map((review, index) => {
                return <div key={index} className='flex gap-5 bg-white items-center border-2 rounded-lg p-5'>
                    <Image src={review.profileImage} alt={review.userName}
                        width={50}
                        height={50}
                        className='rounded-full'
                    />
                    <div>
                        <h2 className='text-sm'>
                            {review.userName}
                        </h2>
                        <ReactRating style={{ maxWidth: 100 }}
                            value={review.star}
                            isDisabled={true}
                             />
                        <h2 className=''>
                            <span className='font-bold'>{review.reviewText}</span> at {moment(review.updatedAt).format('DD-MMM-yyyy')}
                        </h2>
                    </div>
                </div>
            })
        : [1, 2, 3, 4].map((item, index) => (
            <div key={index} className='h-[100px] w-full bg-slate-200 animate-pulse rounded-lg' />
        ))
        
        }
        </div>
    )
}

export default ReviewList