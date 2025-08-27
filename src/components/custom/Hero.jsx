import React from 'react'
import { Link } from 'react-router-dom'
import laptop from '../../assets/images/laptop.png'
import phone from '../../assets/images/phone.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function Hero() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 50,
    })
  }, [])

  return (
    <div className="flex flex-col items-center mx-6 xl:mx-50 gap-9 cursor-pointer">
      <h1
        className="font-extrabold sm:text-[50px] text-[30px] text-center mt-36 xl:mt-16"
        data-aos="fade-down"
      >
        <span
          className="bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] bg-clip-text text-transparent font-bold"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          Plan Less, Explore More:
        </span>
        <span data-aos="fade-up" data-aos-delay="300"> AI Makes Travel Effortless!</span>
      </h1>

      <p
        className="text-xl text-gray-500 text-center "
        data-aos="fade-right"
        data-aos-delay="400"
      >
        Your personal planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'} data-aos="zoom-in" data-aos-delay="500">
        <button className="bg-[#2945a1ad] text-white px-6 py-3 xl:mt-0 mt-7  rounded-lg text-lg font-semibold hover:bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] transition-all">
          Get started <span className="font-normal">─ it's free</span>
        </button>
      </Link>

      <div
        className="hidden sm:flex flex-col sm:flex-row gap-5 xl:w-[80%] justify-center"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <img
          src={laptop}
          alt="Laptop"
          className="w-32   xl:w-[70%]"
          data-aos="flip-left"
          data-aos-delay="700"
        />
        <img
          src={phone}
          alt="Phone"
          className="w-20  xl:w-[70%]"
          data-aos="flip-right"
          data-aos-delay="800"
        />
      </div>


    </div>
  )
}

export default Hero;
