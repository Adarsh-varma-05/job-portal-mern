import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import JobCard from './JobCard';

const Jobs = () => {
  const {jobsData} = useContext(AppContext);
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
      <h1 className='text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800'>Featured Jobs
      </h1>
      {jobsData.length === 0 ? (
        <p className='text-gray-400 mt-10 text-center'>No jobs available yet. Check back soon!</p>
      ) : (
      <div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {jobsData.slice(0, 6).map((job) => (
          <JobCard key = {job._id} job={job} />
        ))}
      </div>
      )}
    </section>
  )
}

export default Jobs
