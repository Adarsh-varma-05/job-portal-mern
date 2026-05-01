import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const PostJob = () => {
  const {navigate, axios, BACKEND_URL} = useContext(AppContext)
  const [jobData , setJobData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    type: "",
    image: null,
    requirements: "",
    benefits: "",
    jobLevel: "",
    education: "",
    experience: "",
  });

  const[preview, setPreview] = useState(null);

  const handleChange = (e) =>{
    setJobData({...jobData, [e.target.name]: e.target.value});
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setJobData({...jobData, image: selectedFile});
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("title", jobData.title);
      formPayload.append("company", jobData.company);
      formPayload.append("description", jobData.description);
      formPayload.append("location", jobData.location);
      formPayload.append("salary", jobData.salary);
      formPayload.append("type", jobData.type);
      formPayload.append("requirements", jobData.requirements);
      formPayload.append("benefits", jobData.benefits);
      formPayload.append("jobLevel", jobData.jobLevel);
      formPayload.append("education", jobData.education);
      formPayload.append("experience", jobData.experience);
      if (jobData.image) {
        formPayload.append("image", jobData.image);
      }

      const { data } = await axios.post(
        `${BACKEND_URL}/job/create`,
        formPayload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/employer/jobs-list");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting job");
    }
  };

  return (
    <form
     onSubmit={handleSubmit}
     className='bg-white text-gray-500 max-w-3xl mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10'
      
    >
      <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>
        Post a new job
      </h2>

      {
        preview && (
          <div className='mb-3 flex justify-center'>
              <img
               src={preview}
               alt=""
               className='w-24 h-24 object-cover rounded-full border shadow'
              />
          </div>
        )}
        <div>
          <input
           type="file"
           accept='image/*'
           onChange={handleFileChange}
           name='image'
           className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer'
          />
        </div>
        <label htmlFor="job title">Job title</label>
        <input
          type="text"
          name='title'
          value={jobData.title}
          onChange={handleChange}
          placeholder='Enter job title'
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
          required
        />
        {/* company name */}
        <label htmlFor="company">Company name</label>
        <input
          type="text"
          name='company'
          value={jobData.company}
          onChange={handleChange}
          placeholder='Enter company name'
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
          required
        />
        {/* job description */}
        <label>Job Description</label>
        <textarea
          name='description'
          value={jobData.description}
          onChange={handleChange}
          rows='3'
          placeholder='Enter job description'
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
          required
         ></textarea>
        {/* job location */}
        <label htmlFor="location">Job Location</label>
        <input
          type="text"
          name='location'
          value={jobData.location}
          onChange={handleChange}
          placeholder='Enter job location'
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
          required
        />
        {/* salary */}
        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          name='salary'
          value={jobData.salary}
          onChange={handleChange}
          placeholder='e.g. $80,000'
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
          required
        />
        <label htmlFor="job type">Job Type</label>
        <select 
          name="type"
          value={jobData.type}
          onChange={handleChange}
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
          required
        >
          <option value="">Select job type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        {/* Requirements  */}
        <label>Requirements</label>
        <textarea
          name='requirements'
          value={jobData.requirements}
          onChange={handleChange}
          rows='2'
          placeholder='Separate requirements with commas'
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
         ></textarea>

        {/* Benefits  */}
        <label>Benefits</label>
        <textarea
          name='benefits'
          value={jobData.benefits}
          onChange={handleChange}
          rows='2'
          placeholder='Separate benefits with commas'
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
         ></textarea>

        {/* job level */}
        <label>Job Level</label>
        <input
          name='jobLevel'
          value={jobData.jobLevel}
          onChange={handleChange}
          type="text"
          placeholder='e.g. Senior, Mid-Level, Entry-Level'
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
        />

        {/* Education  */}
        <label>Education</label>
        <input
          name='education'
          value={jobData.education}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Bachelor's Degree"
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
        />
        <label>Experience</label>
        <input
          name='experience'
          value={jobData.experience}
          onChange={handleChange}
          type="text"
          placeholder="e.g. 3 Years"
          className='w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4'
        />
        <button 
         type='submit'
         className='w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white'
        >
          Post Job 
        </button>
    </form>
  );
};

export default PostJob;
