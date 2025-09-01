import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import laptop from '../../assets/images/laptop.png';
import phone from '../../assets/images/phone.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hyperspeed from "../custom/Hyperspeed";

function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Background Hyperspeed Effect */}
      <Hyperspeed
        effectOptions={{
          onSpeedUp: () => {},
          onSlowDown: () => {},
          distortion: 'turbulentDistortion',
          length: 400,
          roadWidth: 10,
          islandWidth: 2,
          lanesPerRoad: 4,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [400 * 0.03, 400 * 0.2],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0xFFFFFF,
            brokenLines: 0xFFFFFF,
            leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
            rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
            sticks: 0x03B3C3,
          }
        }}
      />

      {/* Content Overlay */}
      <div 
        className="flex flex-col items-center px-6 xl:px-36 gap-9"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1
          className="font-extrabold sm:text-[50px] text-[25px] text-center leading-tight"
          data-aos="fade-down"
        >
          <span
            className="bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] bg-clip-text text-transparent font-bold"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Plan Less, Explore More:
          </span>
          <span 
            data-aos="fade-up" 
            data-aos-delay="300" 
            className="text-slate-400"
          > 
            AI Makes Travel Effortless!
          </span>
        </h1>

        <p
          className="text-xl text-gray-300 text-center max-w-5xl"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          Your personal planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>

        <Link to="/create-trip" data-aos="zoom-in" data-aos-delay="500">
          <button className="bg-[#2945a1ad] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm">
            Get started <span className="font-normal">— it's free</span>
          </button>
        </Link>

        {/* <div
          className="hidden sm:flex flex-col sm:flex-row gap-8 xl:w-[80%] justify-center mt-12"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <img
            src={laptop}
            alt="Laptop mockup showing travel planning interface"
            className="w-40 xl:w-[45%] max-w-md opacity-90 hover:opacity-100 transition-opacity duration-300"
            data-aos="flip-left"
            data-aos-delay="700"
          />
          <img
            src={phone}
            alt="Phone mockup showing mobile travel app"
            className="w-24 xl:w-[25%] max-w-xs opacity-90 hover:opacity-100 transition-opacity duration-300"
            data-aos="flip-right"
            data-aos-delay="800"
          />
        </div> */}

        <div className="mt-16">
          <p className="font-bold text-xl text-slate-300 text-center mb-1">
            POWERED BY
          </p>
          <div className="flex items-center justify-center mb-5">
            <img
              src="/gemini.png"
              alt="Powered by Gemini AI"
              className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 opacity-80 hover:opacity-100"
              height={160}
              width={160}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;