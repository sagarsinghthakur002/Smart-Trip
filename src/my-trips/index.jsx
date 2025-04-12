import React, { useEffect, useState } from 'react';
import { db } from '../service/firebaseConfig.jsx';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {                                                    // Fetch user trips when the component mounts
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {                                   // Function to fetch user trips from Firestore
        const user = JSON.parse(localStorage.getItem("user"));      
        if (!user) {
            navigate('/');
            return;
        }

        setUserTrips([]);                                                // Clear previous trips before fetching new ones

        const q = query(                                                 // Create a query to fetch trips for the logged-in user
            collection(db, "AITrips"),
            where("userEmail", "==", user?.email)
        );

        const querySnapshot = await getDocs(q);                         // Fetch documents from the query
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips((prev) => [...prev, doc.data()]);              // Update state with fetched trips
        });
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 py-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-10'>
                {userTrips?.length > 0 ? (
                    userTrips.map((trip, index) => (
                        <UserTripCardItem key={index} trip={trip} />
                    ))
                ) : (
                    [1, 2, 3, 4, 5, 6].map((item, index) => ( 
                        <div key={index} className='hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-md border rounded-xl overflow-hidden bg-white h-40'>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}
export default MyTrips;
