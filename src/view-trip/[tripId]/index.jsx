import React, { useState, useEffect } from "react";
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../service/firebaseConfig.jsx';



function Viewtrip() {

     const {tripId} = useParams();
     const [trip, setTrip] = useState({});

     useEffect(() => {
      trip&&GetTripData();
      }, [tripId]);
    
    //   used to get Trip data from firebase
    const GetTripData=async() =>{
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
    <div>
      viewtrip: {tripId}
    </div>
  )
}

export default Viewtrip
