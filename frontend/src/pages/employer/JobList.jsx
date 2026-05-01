import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const JobList = () => {
  const {navigate, axios, BACKEND_URL} = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/job/my-jobs`);
        if (data.success) {
          setJobs(data.jobs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  if (loading) return <div className="py-16 text-center">Loading...</div>;

  return (
        <div className='py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70'>
      <h1 className='text-2xl md:text-5xl font-medium text-gray-800 mb-8'>
        My Jobs
        </h1>
        {!jobs || jobs.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-lg'>
                No jobs posted yet
            </div>
            
          </div>
        ): (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Job details
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Company
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Type
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Location
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Salary
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'> 
                  {jobs.map((job,index) => (
                    <tr className='hover:bg-gray-50 transition-colors hover:cursor-pointer'
                    onClick={()=>navigate(`/job-details/${job._id}`)}
                    key={index}
                    >
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {job.title}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {job.company}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {job.type}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {job.location}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {job.salary}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                          ${job.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          ${job.status === "Closed" ? "bg-red-100 text-red-800" : ""}
                          ${job.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                        `}>
                          {job.status || "Active"}
                        </span>
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

export default JobList
