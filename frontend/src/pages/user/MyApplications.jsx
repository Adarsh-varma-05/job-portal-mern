import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const MyApplications = () => {
  const {navigate, fetchMyApplications, BACKEND_URL} = useContext(AppContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      const apps = await fetchMyApplications();
      setApplications(apps || []);
      setLoading(false);
    };
    loadApplications();
  }, []);

  if (loading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  return (
    <div className='py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70'>
      <h1 className='text-2xl md:text-5xl font-medium text-gray-800 mb-8'>
        Applied Jobs
        </h1>
        {!applications || applications.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-lg'>
                You have not applied to any jobs yet.
            </div>
            <p className='text-gray-400 mt-4'>
              {" "}
              Explore available job opportunities and start applying to find your next career move!
            </p>
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
                  {applications.map((app,index) => (
                    <tr className='hover:bg-gray-50 transition-colors hover:cursor-pointer'
                    onClick={()=>navigate(`/job-details/${app.job?._id}`)}
                    key={index}
                    >
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {app.job?.title || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {app.job?.company || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {app.job?.type || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {app.job?.location || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {app.job?.salary || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                          ${app.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                          ${app.status === "Reviewed" ? "bg-blue-100 text-blue-800" : ""}
                          ${app.status === "Shortlisted" ? "bg-green-100 text-green-800" : ""}
                          ${app.status === "Rejected" ? "bg-red-100 text-red-800" : ""}
                          ${app.status === "Hired" ? "bg-emerald-100 text-emerald-800" : ""}
                        `}>
                          {app.status || "Pending"}
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
  );
};

export default MyApplications;
