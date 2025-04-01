import React from 'react';
import Imge from '../../assets/images/image.png';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotels || []; // Ensures hotels is always an array

  return (
    <div className='cursor-pointer'>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 l gap-5 mt-5'>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <Link 
              key={hotel.hotelName} 
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName + ', ' + hotel.hotelAddress)}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:scale-105 transition-transform duration-300 ease-in-out"
            > 
              <div className='border rounded-xl shadow-md overflow-hidden bg-white'>
                <img 
                  src={Imge} 
                  alt={hotel?.hotelName || "Hotel Image"} 
                  className='rounded-t-xl h-40 w-full object-cover'
                />
                <div className='p-3 flex flex-col gap-1 h-[10em]'>
                  <h2 className='font-semibold text-lg'>{hotel?.hotelName ?? "Unknown Hotel"}</h2>
                  <p className='text-sm text-gray-500'>📍{hotel?.hotelAddress ?? "No address available"}</p>
                  <p className='text-sm text-gray-700'>💳{hotel?.priceRange ?? "Price not available"}</p>
                  <p className='text-sm text-gray-700'>⭐ {hotel?.rating ?? "Not rated"}</p>
                </div>
              </div> 
            </Link>                         
          ))
        ) : (
          <p className="text-gray-500 italic mt-3">No hotel recommendations available.</p>
        )}
      </div>
    </div>
  );
}

export default Hotels;
