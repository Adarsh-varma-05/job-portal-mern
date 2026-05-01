import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

const AllComapnies = () => {
  const {companyData, fetchAllCompanies, BACKEND_URL} = useContext(AppContext);

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  return (
    <div className='max-w-4xl w-full px-6 mx-auto mt-10 bg-white shadow rounded-lg '>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-medium text-gray-800'>
          All Companies
        </h2>
      </div>
      {companyData.length === 0 ? (
        <div className='text-center py-12 text-gray-400'>
          No companies registered yet.
        </div>
      ) : (
      <table className=' w-full border border-gray-300 rounded overflow-hidden '>
        <thead className='bg-gray-50'>
          <tr>
            <th className='text-left p-3 border-b'>Logo</th>
            <th className='text-left p-3 border-b'>Name</th>
            <th className='text-left p-3 border-b'>About</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-300'>
          {
             companyData.map((company) => (
              <tr key={company._id} className='hover:bg-gray-50'>
                <td className='p-3 border-b'> 
                  <img
                   src={company.logo ? `${BACKEND_URL}/uploads/${company.logo}` : ""} 
                   alt=""
                   className='w-16 h-16 object-cover border'
                  />
                </td>
                <td className='p-3 border-b'>
                  {company.name}
                </td>
                <td className='p-3 border-b'>
                  {company.about}
                </td>
              </tr>
             ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default AllComapnies;
