import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets';


const JobCard = ({job}) => {
  const {navigate, BACKEND_URL} = useContext(AppContext);
  const imageUrl = job.image 
    ? (job.image.startsWith("http") ? job.image : `${BACKEND_URL}/uploads/${job.image}`)
    : assets.google_icon;
  return (
    <div onClick={() => navigate(`/job-details/${job._id}`)}
    className='p-5 flex w-full min-w-0 flex-col gap-2 rounded-md border border-gray-300 bg-gradient-to-r from-purple-200/80 cursor-pointer'
    >
      <h1 className='text-xl sm:text-2xl font-medium text-gray-800 break-words'>{job.title}</h1>
      <div className='flex flex-wrap gap-3 items-center'>
        <p className='text-sm bg-green-300/40 p-1'>{job.type}</p>
        <p className='text-sm text-gray-800'>{job.salary}</p>
      </div>
      <div className='flex gap-3 items-center my-2 min-w-0'>
        <img src={imageUrl} alt="" className='w-12 h-12 shrink-0 object-cover' />
        <div className='flex min-w-0 flex-1 flex-col text-sm'>
          <h3 className='truncate'>{job.company}</h3>
          <h3 className='truncate text-gray-600'>{job.location}</h3>
        </div>
        <div className='shrink-0'>
          <img src={assets.save_later_icon} alt="" className='w-12 h-12' />
        </div>
      </div>
    </div>
  )
}

export default JobCard;
