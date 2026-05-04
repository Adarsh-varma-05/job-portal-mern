import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import JobCard from '../components/JobCard';

const AllJobs = () => {
  const {jobsData , query} = useContext(AppContext);
  const fillteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(query.toLowerCase()) 
  );
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
      <h1 className='text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800'>
        Available Jobs
      </h1>
      <div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {fillteredJobs.map((job) => (
          <JobCard key = {job._id} job={job} /> 
        ))}
      </div>
      
    </section>
  )
}

export default AllJobs
