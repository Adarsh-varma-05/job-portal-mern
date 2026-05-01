
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const AppContext = createContext();
import { toast } from "react-hot-toast";
import axios from "axios";
axios.defaults.withCredentials = true;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [employer, setEmployer] = useState(false);
  const [admin, setAdmin] = useState(false);

  const [categoriesData, setCategoriesData] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [query, setQuery] = useState("");

  const [isJobApplied, setIsJobApplied] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const [companyData, setCompanyData] = useState([]);
  const [applicantsData, setApplicantsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/category/all`);
      if (data.success) {
        setCategoriesData(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all jobs from backend
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/job/all`);
      if (data.success) {
        setJobsData(data.jobs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch companies (employer's own companies)
  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/company/my-companies`);
      if (data.success) {
        setCompanyData(data.companies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all companies (admin)
  const fetchAllCompanies = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/company/all`);
      if (data.success) {
        setCompanyData(data.companies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch applicants (employer)
  const fetchApplicants = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/application/applicants`);
      if (data.success) {
        setApplicantsData(data.applications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all applications (admin)
  const fetchAllApplications = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/application/all`);
      if (data.success) {
        setApplicantsData(data.applications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all users (admin)
  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/user/all`);
      if (data.success) {
        setAllUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch my applications (student)
  const fetchMyApplications = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/application/my-applications`);
      if (data.success) {
        // Extract applied job IDs
        const appliedIds = data.applications.map((app) => app.job?._id);
        setIsJobApplied(appliedIds);
        return data.applications;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const saveJob = (job) => {
    setSavedJobs((prev) => {
      const exists = prev.find((item) => item._id === job._id);
      if (exists) {
        return prev;
      } else {
        return [...prev, job];
      }
    });
    toast.success("Job saved successfully");
  };

  const applyJob = async (jobId) => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/application/apply`, { jobId });
      if (data.success) {
        setIsJobApplied((prev) => {
          if (prev.includes(jobId)) return prev;
          return [...prev, jobId];
        });
        toast.success("Job Applied Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error applying");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchJobs();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    employer,
    setEmployer,
    admin,
    setAdmin,
    categoriesData,
    jobsData,
    setJobsData,
    query,
    setQuery,
    isJobApplied,
    setIsJobApplied,
    savedJobs,
    saveJob,
    applyJob,
    companyData,
    setCompanyData,
    applicantsData,
    setApplicantsData,
    allUsers,
    setAllUsers,
    axios,
    BACKEND_URL,
    fetchCategories,
    fetchJobs,
    fetchCompanies,
    fetchAllCompanies,
    fetchApplicants,
    fetchAllApplications,
    fetchAllUsers,
    fetchMyApplications,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
