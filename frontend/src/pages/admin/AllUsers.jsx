import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const AllUsers = () => {
  const {allUsers, fetchAllUsers, axios, BACKEND_URL} = useContext(AppContext);

  useEffect(() => { fetchAllUsers(); }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${BACKEND_URL}/user/delete/${id}`);
      if (data.success) { toast.success("User deleted"); fetchAllUsers(); }
      else { toast.error(data.message); }
    } catch (error) { toast.error("Error deleting user"); }
  };

  return (
    <div className='py-8 px-4 max-w-7xl mx-auto'>
      <h1 className='text-2xl md:text-4xl font-medium text-gray-800 mb-8'>All Users</h1>
      {!allUsers || allUsers.length === 0 ? (
        <div className='text-center py-12 text-gray-400 text-lg'>No users found</div>
      ) : (
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Image</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Name</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Email</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Role</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Joined</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {allUsers.map((user, i) => (
                  <tr className='hover:bg-gray-50' key={i}>
                    <td className='px-6 py-4'>
                      <img src={user.image ? `${BACKEND_URL}/uploads/${user.image}` : ""} alt="" className='w-10 h-10 rounded-full object-cover border'/>
                    </td>
                    <td className='px-6 py-4 text-sm font-medium text-gray-900'>{user.name}</td>
                    <td className='px-6 py-4 text-sm text-gray-900'>{user.email}</td>
                    <td className='px-6 py-4'>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === "student" ? "bg-blue-100 text-blue-800" : user.role === "employer" ? "bg-purple-100 text-purple-800" : "bg-red-100 text-red-800"}`}>{user.role}</span>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className='px-6 py-4'>
                      <button onClick={() => handleDelete(user._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs cursor-pointer'>Delete</button>
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

export default AllUsers;
