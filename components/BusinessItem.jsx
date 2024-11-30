import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BusinessItem = ({business}) => {

  const CalculateRating = () =>{
    let total = 0
    let count = 0
    business?.review.forEach(item=>{
      return (total=total+item.star,count++);
    })
    const result=total/count;
    return result?result.toFixed(1):5;
  }

  return (
    <Link
    href={'/restaurant/'+business?.slug}
    className='p-3 hover:border rounded-xl hover:border-primary transition-all duration-100 ease-in-out
    hover:bg-accent-HOVER
    '>
        <Image src={business.banner?.url} alt={business.name} width={500} height={130}
        className='h-[130px] rounded-xl object-cover'
        />
        <div className='mt-2'>
            <h2 className='font-bold text-lg'>{business.name}</h2>
        </div>
        <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <Image src="/star.png" width={14} height={14} alt='star'/>
                <label className='text-primary'>{CalculateRating()}</label>
                <h2 className='text-primary text-sm'>{business?.restroType[0]}</h2>
            </div>
            <h2 className='text-sm text-red-500 font-semibold'>{business.categories[0].name}</h2>
        </div>
    </Link>
  )
}

export default BusinessItem