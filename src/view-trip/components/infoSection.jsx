import React, { useEffect } from 'react'
import Imge from '../../assets/images/image.png'
import { FaShare } from "react-icons/fa";
// import { GetPlaceDetails } from '@/service/GlobalApi';
import travel from '../../assets/images/travel.png'
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
      <img src={travel} className=' w-full h-[27rem]  rounded-bl-xl ' alt='trip' />


      <div className='flex justify-between items-center '>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>

          <div className='flex flex-col gap-5 md:flex-row'>
            <h2 className='px-3 py-2 bg-zinc-800 rounded-full text-white  text-xs md:text-md lg:text-lg'>{trip?.userSelection?.noOfDays} Day</h2>
            <h2 className='px-3 py-2 bg-zinc-800 rounded-full text-white text-xs md:text-md lg:text-lg'>{trip?.userSelection?.budget} Budget</h2>
            <h2 className='px-3 py-2 bg-zinc-800 rounded-full text-white text-xs md:text-md lg:text-lg'> No. of Traveler: {trip?.userSelection?.traveler} Traveler</h2>
          </div>
        </div>
        <button><FaShare /></button>
      </div>
    </div>
  )
}

export default InfoSection
