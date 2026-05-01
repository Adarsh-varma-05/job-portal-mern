import React from 'react'
import {assets} from "../assets/assets";
import { heroData } from '../assets/assets';
const Hero = () => {
  return (
    <div className='py-16 bg-[#F1F2F4]' >
      <div className='flex flex-col md:flex-row items-center justify-between gap-5'>
        {/* left-section */}
        <div className='max-w-[450px] w-full flex flex-col px-4 gap-5'>
          <h1 className='text-2xl md:text-5xl font-semibold text-gray-800'>
            Find a job that suits your interest & skills.</h1>
            <p className='text-sm text-gray-700'>
              {" "}
              Find your dream job or hire talent effortlessly with our modern job portal platform.
            </p>
        </div>

        {/* right-section */}
        <div>
          <img src={assets.hero_img} alt="" />
        </div>
      </div>


      {/* hero data section */} 

      <div className='flex flex-wrap items-center justify-center gap-2 mt-10 '>
        {heroData.map((item) =>(
          <div key={item._id}
          className='bg-white w-[270px] h-[112px] flex items-center gap-4 justify-center p-4 shadow-md'>
            <img src={item.icon} alt="" />
            <div className='flex flex-col gap-1'>
              <p>{item.count}</p>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero
