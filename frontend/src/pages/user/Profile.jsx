import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { axios, BACKEND_URL, user, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profileImage: null,
    resume: null,
  });

  const [preview, setPreview] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/user/profile`);
        if (data.success) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            location: data.user.location || "",
            bio: data.user.bio || "",
            profileImage: null,
            resume: null,
          });
          if (data.user.image) {
            setPreview(`${BACKEND_URL}/uploads/${data.user.image}`);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      if (name === "profileImage" && files[0]) {
        setPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("phone", formData.phone);
      formPayload.append("location", formData.location);
      formPayload.append("bio", formData.bio);
      if (formData.profileImage) {
        formPayload.append("profileImage", formData.profileImage);
      }
      if (formData.resume) {
        formPayload.append("resume", formData.resume);
      }

      const { data } = await axios.put(
        `${BACKEND_URL}/user/update-profile`,
        formPayload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  return (
    <div className='max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-lg'>
      <h2 className='text-2xl font-semibold mb-4'>My Profile</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          {preview && (
            <img 
            src={preview}
            alt="preview" 
            className='w-24 h-24 object-cover rounded-full mb-4'
            />
          )}
        </div>
        <div>
          <label className='block mb-1 font-semibold'>Profile Image</label>
          <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
        </div>
{/* full name  */}
        <div>
          <label className='block mb-1 font-semibold'>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='w-full border rounded p-2'
            required
            />
        </div>
{/* email  */}
        <div>
          <label className='block mb-1 font-semibold'>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className='w-full border rounded p-2 bg-gray-100'
          />
        </div>

{/* phone  */}
        <div>
          <label className='block mb-1 font-semibold'>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className='w-full border rounded p-2'
            />
        </div>

{/* location  */}
        <div>
          <label className='block mb-1 font-semibold'>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className='w-full border rounded p-2'
            />
        </div>

        {/* about  */}
        <div>
          <label className='block mb-1 font-semibold'>About</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className='w-full border rounded p-2'
            rows="3"
            placeholder='Tell us about yourself...'
          ></textarea>
        </div>
        {/* resume  */}
        <div>
          <label className='block mb-1 font-semibold'>Resume(PDF/DOC)</label>
          <input type="file" name="resume" onChange={handleChange} />
        </div>
        <button
          type="submit"
          className='bg-primary text-white py-2 px-4 rounded'
        >
          Update Profile
        </button>
      </form> 
    </div>
  )
}

export default Profile;
