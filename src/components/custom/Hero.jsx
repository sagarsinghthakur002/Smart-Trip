import React from 'react'
import { Link } from 'react-router-dom'
import laptop from '../../assets/images/laptop.png'
import phone from '../../assets/images/phone.png'
// import travel from '../../assets/images/travel.png'
function Hero() {
  return (
    <div className="flex flex-col  items-center mx-10 sm:mx-56 gap-9 cursor-pointer">
      <h1 className="font-extrabold sm:text-[50px]  text-[30px] text-center mt-16">
        <span className="bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] bg-clip-text text-transparent font-bold">
          Plan Less, Explore More:
        </span>
        AI Makes Travel Effortless!
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <button className="bg-[#2945a1ad] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] transition-all">
          Get started <span className="font-normal">─ it's free</span>
        </button>
      </Link>
      <div className='flex flex-col sm:flex-row gap-5 w-full justify-center'>
        <img src={laptop} />
        <img src={phone} />
      </div>

      {/* <img src={travel} className="w-full   rounded-lg" alt="trip" /> */}

    </div>

  )
}

export default Hero