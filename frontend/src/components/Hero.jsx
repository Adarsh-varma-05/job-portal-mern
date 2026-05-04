import React from 'react'
import {assets} from "../assets/assets";
import { heroData } from '../assets/assets';
const Hero = () => {
  return (
    <section className='py-12 md:py-16 bg-[#F1F2F4]' >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10'>
        {/* left-section */}
        <div className='max-w-[540px] w-full flex flex-col gap-5 text-center md:text-left'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800'>
            Find a job that suits your interest & skills.</h1>
            <p className='text-sm text-gray-700'>
              {" "}
              Find your dream job or hire talent effortlessly with our modern job portal platform.
            </p>
        </div>

        {/* right-section */}
        <div className='w-full max-w-[560px]'>
          <img src={assets.hero_img} alt="" className='w-full h-auto' />
        </div>
      </div>


      {/* hero data section */} 

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
        {heroData.map((item) =>(
          <div key={item._id}
          className='bg-white w-full min-h-[112px] flex items-center gap-4 justify-center p-4 shadow-md rounded-md'>
            <img src={item.icon} alt="" />
            <div className='flex flex-col gap-1'>
              <p>{item.count}</p>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Hero
