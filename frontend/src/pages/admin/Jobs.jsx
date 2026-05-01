import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const Jobs = () => {
  const {navigate, axios, BACKEND_URL} = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  const fetchAllJobs = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/job/all`);
      if (data.success) setJobs(data.jobs);
    } catch (error) { console.log(error); }
  };

  useEffect(() => { fetchAllJobs(); }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${BACKEND_URL}/job/delete/${id}`);
      if (data.success) { toast.success("Job deleted"); fetchAllJobs(); }
    } catch (error) { toast.error("Error deleting job"); }
  };

  return (
    <div className='py-8 px-4 max-w-7xl mx-auto'>
      <h1 className='text-2xl md:text-4xl font-medium text-gray-800 mb-8'>All Jobs</h1>
      {jobs.length === 0 ? (
        <div className='text-center py-12 text-gray-400 text-lg'>No jobs available</div>
      ) : (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Title</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Company</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Type</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Location</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Salary</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Status</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {jobs.map((job, i) => (
                  <tr className='hover:bg-gray-50 cursor-pointer' key={i}>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900' onClick={() => navigate(`/job-details/${job._id}`)}>{job.title}</td>
                    <td className='px-6 py-4 text-sm text-gray-900'>{job.company}</td>
                    <td className='px-6 py-4 text-sm text-gray-900'>{job.type}</td>
                    <td className='px-6 py-4 text-sm text-gray-900'>{job.location}</td>
                    <td className='px-6 py-4 text-sm text-gray-900'>{job.salary}</td>
                    <td className='px-6 py-4'>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${job.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{job.status || "Active"}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <button onClick={() => handleDelete(job._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs cursor-pointer'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Jobs;
