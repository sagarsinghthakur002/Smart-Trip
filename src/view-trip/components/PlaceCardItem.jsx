import React from 'react';
import { Link } from 'react-router-dom';
import Imge from '../../assets/images/image.png';

function PlaceCardItem({ place }) {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.placeName + ', ' + place.placeDetails
      )}`}
      target="_blank"
    >
      <div className="rounded-xl p-3 mt-2 border flex gap-5 hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={Imge} // Use place.imageUrl if available
          className="w-[130px] h-[130px] rounded"
          alt={place.placeName}
        />

        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2">🕙{place.timeToVisit}</h2>
          <h2>🎫 Ticket Fee:{place.ticketPricing}</h2>
          
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
