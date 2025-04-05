import React from 'react'
import Imge from '../../assets/images/image.png';
import { Link } from 'react-router-dom';
function UserTripCardItem({ trip }) {
    return (

        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-md border rounded-xl overflow-hidden bg-zinc-900 flex'>
                <img src={Imge} alt='' className='object-cover  w-40' />
                <div>
                    <h2 className='font-bold text-lg pl-3 pt-3'>{trip?.userSelection?.location}</h2>
                    <h2 className='text-sm text-gray-500 pl-3'>{trip?.userSelection?.noOfDays} Day trip with {trip?.userSelection?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCardItem
