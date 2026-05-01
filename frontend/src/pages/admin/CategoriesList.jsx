import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CategoriesList = () => {
  const {axios, BACKEND_URL, fetchCategories, categoriesData} = useContext(AppContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${BACKEND_URL}/category/delete/${id}`);
      if (data.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <div className='p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
        All Categories
      </h2>
      {categoriesData.length === 0 ? (
        <div className='text-center py-12 text-gray-400'>
          No categories found. Add a new category to get started.
        </div>
      ) : (
      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-200 text-sm'>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='py-3 px-4 border-b'>Icon</th>
              <th className='py-3 px-4 border-b'>Category Name</th>
              <th className='py-3 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map((category) => (
              <tr key={category._id} className='hover:bg-gray-50'>
                <td className='py-3 px-4 border-b'>
                  {category.icon ? (
                    <img
                      src={category.icon.startsWith("http") ? category.icon : `${BACKEND_URL}/uploads/${category.icon}`}
                      alt=""
                      className='w-12 h-12 rounded object-cover border'
                    />
                  ) : (
                    <div className='w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400'>—</div>
                  )}
                </td>
                <td>
                  <p className='py-3 px-4 font-medium'>{category.name}</p>
                </td>
                <td className='py-3 px-4 '>
                  <button 
                    onClick={() => handleDelete(category._id)}
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:scale-95 cursor-pointer'
                   >delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  )
}

export default CategoriesList;
