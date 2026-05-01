import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { toast } from 'react-hot-toast';


const JobDetail = () => {
  const { jobsData, isJobApplied, applyJob, saveJob, BACKEND_URL, axios } = useContext(AppContext);
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Try from context first
    const found = jobsData.find((j) => j._id === id);
    if (found) {
      setJob(found);
    } else {
      // Fetch from backend
      const fetchJob = async () => {
        try {
          const { data } = await axios.get(`${BACKEND_URL}/job/${id}`);
          if (data.success) {
            setJob(data.job);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchJob();
    }
  }, [id, jobsData]);

  if (!job) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  const imageUrl = job.image 
    ? (job.image.startsWith("http") ? job.image : `${BACKEND_URL}/uploads/${job.image}`)
    : assets.google_icon;
  
  return (
    <div className='py-16'>
      <h1 className='text-2xl md:text-5xl text-gray-800 font-semibold'>
      Job Details
      </h1>
      <div className='w-full flex flex-col md:flex-row items-center justify-center mt-10 gap-10'>
        {/* left section */}
        <div className='flex flex-col'>
          <div className='flex items-center gap-5'>
            <img src={imageUrl} alt="" className='w-[86px] h-[86px] object-cover' />
            <div>
              <h2 className='text-lg md:text-2xl font-semibold'>{job.title}</h2>
              <p className='text-xs sm:text-base'>
              at  {job.company} <span className='bg-green-200/40 p-1 rounded ml-2'>
               {job.type}
                </span> {" "}
              </p>
            </div>
          </div>
          {/* job descriptions */}
          <div className='my-2 flex flex-col gap-4'>
            <h4 className='text-lg font-semibold text-gray-800'>
              Job Description</h4>
              <p>{job.description}</p>
          </div>
          {/* job-requirements */}
          <div className='my-1 flex flex-col gap-4'>
            <h4 className='text-lg font-semibold text-gray-800'>
              Job Requirements
            </h4>
            <ul className='list-disc'>
              {
                (job.requirements || []).map((item,index) =>(
                  <li key={index} className='text-gray-700'>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          {/* job benefits */}
          <div>
            <h4 className='text-lg font-semibold text-gray-800'>
              Job Benefits
            </h4>
            <ul className='list-disc'>
              {
                (job.benefits || []).map((item,index) =>(
                  <li key={index} className='text-gray-700'>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {/* right section */}
        <div className='flex flex-col'>
          <div className='flex gap-4'>
            <div onClick={() => saveJob(job)}>
              <img 
              src={assets.save_later_icon} 
              alt="" 
              className='cursor-pointer'
              />
            </div>

            <button
            onClick={() => applyJob(job._id)}
            disabled={isJobApplied.includes(job._id)}
            className="cursor-pointer px-10 py-1 bg-primary transition text-white rounded-full disabled:opacity-50"
            >
            {isJobApplied.includes(job._id) ? "Applied" : "Apply Now"}
            </button>
          </div>

          {/* job salary  */}
          <div className='my-5 flex flex-wrap gap-3 border border-gray-300 p-4'>
            <p className='text-base text-gray-800 font-medium'>
              Salary : {job.salary}
            </p>
            <div className='flex items-center gap-4'>
              <p className='text-base text-gray-800 font-medium'>
              Job Location:
              </p>
              <p>{job.location}</p>
            </div>
          </div>
          {/* job overview */}
          <div className='my-1 flex flex-col gap-3 border border-gray-300 p-4'>
            <p className='text-xl text-gray-800 font-bold'>Job Overview</p>
            <div className='flex flex-wrap items-center gap-2'>
              <p>posted date : {job.postedDate || new Date(job.createdAt).toLocaleDateString()}</p>
              <p>job level : {job.jobLevel}</p>
              <p>Education : {job.education}</p>
              <p>Experience : {job.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail;
