import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import PopularVacancies from '../components/PopularVacancies'
import HowWorks from '../components/HowWorks'
import Categories from '../components/Categories'
import Jobs from '../components/Jobs'
import Testimonial from '../components/Testimonial'
import { AppContext } from '../context/AppContext'

const Home = () => {
  const { setQuery } = useContext(AppContext);
  useEffect(() => {
    setQuery("");
  },[]);
  return (
    <div>
      <Hero />
      <PopularVacancies />
      <HowWorks />
      <Categories />
      <Jobs />
      <Testimonial />
    </div>
  )
}

export default Home
