import React, { useState, useEffect } from "react";
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../service/firebaseConfig.jsx';
import InfoSection from '../components/infoSection.jsx';
import Hotels from "../components/Hotels.jsx";
import PlaceToVisit from "../components/PlaceToVisit.jsx";
import Footer from "../components/Footer.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

function Viewtrip() {

     const {tripId} = useParams();                      //Get the tripId from the URL
     const [trip, setTrip] = useState({});

     useEffect(() => {                                  //Only fetch trip data when the tripId changes
      trip&&GetTripData();
      }, [tripId]);

     useEffect(() => {
      AOS.init({ duration: 1000 });
     }, []);
    
                                                      
    const GetTripData=async() =>{                       //Function to fetch trip data from Firestore
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
      } 
      else {
        console.log("No such document!");
        toast("Trip not found.");
      }

     }

     
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56 cursor-auto">

      <div data-aos="fade-up">
        <InfoSection trip={trip} />
      </div>

      <div data-aos="fade-up">
        <Hotels trip={trip} />
      </div>

      <div data-aos="fade-up">
        <PlaceToVisit trip={trip} />
      </div>

      <div data-aos="fade-up">
        <Footer trip={trip} />
      </div>

    </div>
  )
}

export default Viewtrip;
