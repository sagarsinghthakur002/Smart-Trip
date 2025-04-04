import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9 cursor-pointer">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[rgb(121,89,209)]">Plan Less, Explore More:</span> AI Makes Travel Effortless!
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <button className="bg-[#2945a1ad] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#8340cf] transition-all">
          Get started <span className="font-normal">─ it's free</span>
        </button>
      </Link>
    </div>
  )
}

export default Hero