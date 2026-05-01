import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const Applicants = () => {
  const {axios, BACKEND_URL, fetchApplicants, applicantsData} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchApplicants();
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="py-16 text-center">Loading...</div>;

  return (
   <div className='py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-purple-200/70'>
      <h1 className='text-2xl md:text-5xl font-medium text-gray-800 mb-8'>
        All Applicants
        </h1>
        {!applicantsData || applicantsData.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-lg'>
                No Applicants Found
            </div>
          </div>
        ): (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Email
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Phone
                    </th>
                    
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Applied Job
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Application Date
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'> 
                  {applicantsData.map((item,index) => (
                    <tr className='hover:bg-gray-50 transition-colors'
                    key={index}
                    >
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {item.applicant?.name || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {item.applicant?.email || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {item.applicant?.phone || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {item.job?.title || "N/A"}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'> 
                        <div className='text-sm font-medium text-gray-900'>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                            ${item.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${item.status === "Reviewed" ? "bg-blue-100 text-blue-800" : ""}
                            ${item.status === "Shortlisted" ? "bg-green-100 text-green-800" : ""}
                            ${item.status === "Rejected" ? "bg-red-100 text-red-800" : ""}
                            ${item.status === "Hired" ? "bg-emerald-100 text-emerald-800" : ""}
                          `}
                        >
                          {item.status || "Pending"}
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

export default Applicants
