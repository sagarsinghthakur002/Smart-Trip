import React from 'react';
import Imge from '../../assets/images/image.png'

function Hotels({ trip }) {
  return (
    <div className='cursor-pointer'>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 cursor-pointer'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
         <div className='hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'>
            <img src={Imge} className='rounded-xl' />
            <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                <h2 className='text-xl'>{hotel?.hotelAddress}</h2>
                <h2 className='text-xs'>{hotel?.price}</h2>
                <h2 className='text-xs'>{hotel?.rating}</h2>
            </div>
         </div>                          
        ))}
      </div>
    </div>
  );
}

export default Hotels;
