import React, { useState, useEffect } from "react";
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../service/firebaseConfig.jsx';
import InfoSection from '../components/infoSection.jsx';
import Hotels from "../components/Hotels.jsx";
import PlaceToVisit from "../components/PlaceToVisit.jsx";
import Footer from "../components/Footer.jsx";

function Viewtrip() {

  const { tripId } = useParams(); // Get the tripId from the URL
  const [trip, setTrip] = useState({});

  useEffect(() => {
    trip && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document!");
      toast("Trip not found.");
    }
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56 cursor-auto">

      <div>
        <InfoSection trip={trip} />
      </div>

      <div>
        <Hotels trip={trip} />
      </div>

      <div>
        <PlaceToVisit trip={trip} />
      </div>

      <div>
        <Footer trip={trip} />
      </div>

    </div>
  );
}

export default Viewtrip;
