import React from 'react'
import HeroSection from './HeroSection'
import Navbar from '../shared/Navbar'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from '../jobs/LatestJobs'
import Footer from '../shared/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home