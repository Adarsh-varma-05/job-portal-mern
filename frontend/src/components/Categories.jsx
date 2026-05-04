import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const Categories = () => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-red-100 text-red-800',
    'bg-indigo-100 text-indigo-800',
    'bg-teal-100 text-teal-800',
  ];
  const {categoriesData, BACKEND_URL} = useContext(AppContext);
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
      <h1 className='text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800'>Most Popular Categories
      </h1>
      {categoriesData.length === 0 ? (
        <p className='text-gray-400 mt-10 text-center'>No categories available yet.</p>
      ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
        {
          categoriesData.map((item, index)=>{
            const colorClass = colors[index % colors.length]
            const iconUrl = item.icon 
              ? (item.icon.startsWith("http") || item.icon.startsWith("data:") ? item.icon : `${BACKEND_URL}/uploads/${item.icon}`)
              : null;
            return (
              <div key={item._id || index}
              className={`flex w-full items-center justify-center gap-3 border border-gray-300 rounded-xl py-6 px-4 text-center shadow ${colorClass}`}
              >
                {iconUrl && <img src={iconUrl} alt="" className='w-10 h-10 object-cover' />}
                <div className='flex flex-col items-center justify-center'>
                  <h3 className='text-lg font-semibold'>{item.name}</h3>
                  {item.positions && <p className='text-sm'>{item.positions} open positions</p>}
                </div>
              </div>
            )
          })
        }
      </div>
      )}
    </section>
  )
}

export default Categories
