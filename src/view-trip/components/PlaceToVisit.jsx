import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlaceToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;
  
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>

      <div className="grid grid-cols-1 gap-5 mt-5">
        {/* Check if itinerary exists*/}
        {itinerary && Object.keys(itinerary).length > 0 ? (
          Object.keys(itinerary).map((dayKey, index) => {
            const item = itinerary[dayKey];
            return (
              <div key={index}>
                <h2 className="font-bold text-lg capitalize">{dayKey.replace('day', 'Day ')}</h2>
                {item.theme && <p className="text-gray-400 italic mb-2">{item.theme}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  {Array.isArray(item.places) && item.places.length > 0 ? (
                    item.places.map((place, placeIndex) => (
                      <div key={placeIndex}>
                        {place.timeToVisit && (
                          <h2 className="text-[#8340cf] font-semibold mb-2">
                            {place.timeToVisit}
                          </h2>
                        )}
                        <PlaceCardItem place={place} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No places listed for this day.</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 italic mt-3">No itinerary available. The AI may not have generated the places to visit yet.</p>
        )}
      </div>
    </div>
  );
}

export default PlaceToVisit;
