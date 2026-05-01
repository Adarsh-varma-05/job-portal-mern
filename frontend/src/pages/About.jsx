import React from 'react'
import {assets} from "../assets/assets";
const About = () => {
  return (
    <div className='py-16 px-4 max-w-7xl ms-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        {/* left section */}
        <div>
          <img src={assets.hero_img} alt="" />
        </div>
        {/* right section */}
        <div>
          <h2 className='text-3xl font-semibold text-gray-800'>
            About Our Job Portal
          </h2>
          <p className='text-gray-600 mb-4 leading-relaxed'>
            {" "}
            We are a simple and reliable job portal that connects job seekers with the right opportunities. Our platform helps freshers and professionals explore verified jobs, apply easily, and grow their careers, while enabling employers to find the right talent faster.
          </p>
          <p className='text-gray-600 mb-4 leading-relaxed'>
            Explore thousands of job listings, apply seamlessly, and take your career to the level with our modern and intuitive platform.
          </p>
        </div>
      </div>
      <div className='mt-12 bg-gray-100 rounded-xl p-6 shadow-inner'>
        <h3 className='text-2xl text-gray-700 mb-3 font-semibold'>
          Why Choose us?</h3>
        <p className='text-gray-600 leading-relaxed'>Thousands of verified job listings
          <br />
          Easy application process <br /> personalized job recommendation{" "} <br /> Secure and trustworthy platform
        </p>

      </div>
    </div>
  )
}

export default About
