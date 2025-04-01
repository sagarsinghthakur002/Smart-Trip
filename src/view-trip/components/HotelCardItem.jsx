// import React from 'react'
// import { Link } from 'react-router-dom'
// // import Image from "your-image-source";
// import Imge from '../../assets/images/image.png'
// // import { FaShare } from "react-icons/fa";

// function HotelCardItem({hotel}) {
//   return (
//     <Link 
//                   key={hotel.hotelName} 
//                   to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName + ', ' + hotel.hotelAddress)}`} 
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block hover:scale-105 transition-transform duration-300 ease-in-out"
//                 > 
//                   <div className='border rounded-xl shadow-md overflow-hidden bg-white'>
//                     <img 
//                       src={Imge} 
//                       alt={hotel?.hotelName || "Hotel Image"} 
//                       className='rounded-t-xl h-40 w-full object-cover'
//                     />
//                     <div className='p-3 flex flex-col gap-1 h-[10em]'>
//                       <h2 className='font-semibold text-lg'>{hotel?.hotelName ?? "Unknown Hotel"}</h2>
//                       <p className='text-sm text-gray-500'>📍{hotel?.hotelAddress ?? "No address available"}</p>
//                       <p className='text-sm text-gray-700'>💳{hotel?.priceRange ?? "Price not available"}</p>
//                       <p className='text-sm text-gray-700'>⭐ {hotel?.rating ?? "Not rated"}</p>
//                     </div>
//                   </div> 
//                 </Link>      
//   )
// }

// export default HotelCardItem
