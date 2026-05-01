import React from 'react'
import {Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AllJobs from './pages/AllJobs'
import JobDetail from './pages/JobDetail'
import About from './pages/About'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import MyApplications from './pages/user/MyApplications'
import Profile from './pages/user/Profile'
import EmployerLayout from './pages/employer/EmployerLayout'
import CompaniesList from './pages/employer/CompaniesList'
import AddCompany from './pages/employer/AddCompany'
import PostJob from './pages/employer/PostJob'
import JobList from './pages/employer/JobList'
import Applicants from './pages/employer/Applicants'
import CategoriesList from './pages/admin/CategoriesList'
import AddCategory from './pages/admin/AddCategory'
import AllComapnies from './pages/admin/AllComapnies'
import AllApplication from './pages/admin/AllApplication'
import AllUsers from './pages/admin/AllUsers'
import Jobs from './pages/admin/Jobs'
import AdminLayout from './pages/admin/AdminLayout'

const App = () => {

  const adminPath = useLocation().pathname.includes("admin");
  const employerPath = useLocation().pathname.includes("employer");
  return (
    <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl: max-w-2xl 2xl:max-w-7xl mx-auto px-4'>
      {adminPath || employerPath ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-jobs" element={<AllJobs />} />
        <Route path="/job-details/:id" element={<JobDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ------------------user Routes---------------- */}
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/profile" element={<Profile />} />

        {/* ------------------employer Routes---------------- */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<CompaniesList />} />
          <Route path='add-company' element={<AddCompany />}/>
          <Route path='post-job' element={<PostJob />}/>
          <Route path='jobs-list' element={<JobList />}/>
          <Route path='applicants' element={<Applicants />}/>
          
        </Route>

        {/* ------------------admin Routes---------------- */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CategoriesList />} />
          <Route path='add-category' element={<AddCategory />}/>
          <Route path='all-companies' element={<AllComapnies />}/>
          <Route path='all-applications' element={<AllApplication />}/>
          <Route path='all-users' element={<AllUsers />}/>
          <Route path='jobs' element={<Jobs />}/>

          
        </Route>



      </Routes>
      {adminPath || employerPath ? null : <Footer />}
      <Toaster />
    </div>
  )
}

export default App
