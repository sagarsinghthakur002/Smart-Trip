import React, { useEffect } from 'react'
import Imge from '../../assets/images/image.png'
import { FaShare } from "react-icons/fa";
// import { GetPlaceDetails } from '@/service/GlobalApi';

function InfoSection({ trip }) {

  // useEffect(()=>{
  //   trip&&GetPlacePhoto();
  // }
  // ,[trip])

  // const GetPlacePhoto=async()=>{
  //   const data={
  //     textQuery:trip?.userSelection?.location?.label
  //   }
  //   const result=await GetPlaceDetails(data).then(resp=>{
  //     console.log(resp.data.places[0].photos[3].name)
  //   })
  // }
  
  return (
    <div>
      <img src={Imge} className='h-[340px] w-full object-cover rounded-bl-xl ' alt='trip' />


      <div className='flex justify-between items-center '>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>

          <div className='flex gap-5'>
            <h2 className='p-1 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-lg'>{trip?.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-lg'>{trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-lg'> No. of Traveler: {trip?.userSelection?.traveler} Traveler</h2>
          </div>
        </div>
        <button><FaShare /></button>
      </div>
    </div>
  )
}

export default InfoSection
