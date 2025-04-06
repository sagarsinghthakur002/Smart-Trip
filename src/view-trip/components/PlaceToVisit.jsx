import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlaceToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>

      <div className="grid grid-cols-1 gap-5 mt-5">
        {trip?.tripData?.itinerary &&
          Object.keys(trip.tripData.itinerary).map((dayKey, index) => {
            const item = trip.tripData.itinerary[dayKey];
            return (
              <div key={index}>
                <h2 className="font-bold text-lg">{dayKey}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  {Array.isArray(item.places) &&
                    item.places.map((place, index) => (
                      <div key={index}>
                        <h2 className="  text-[#8340cf] font-semibold">
                          {place.timeToVisit}
                        </h2>
                        <PlaceCardItem place={place} />
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlaceToVisit;
