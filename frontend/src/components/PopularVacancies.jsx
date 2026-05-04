import React from 'react'
import { vacancies } from '../assets/assets';
const PopularVacancies = () => {

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

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
      <h1 className='text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800'>Most Popular Vacancies
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
        {vacancies.map((item,index) => {
          const colorClass = colors[index % colors.length];
          return (
          <div key ={index} 
          className={`flex flex-col w-full items-center justify-center gap-1 border border-gray-300 rounded-xl py-6 px-4 text-center shadow ${colorClass}`}
          >
            <h3 className='text-lg font-semibold'>{item.title}</h3>
            <p className='text-sm'>{item.count} open positions</p>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default PopularVacancies
