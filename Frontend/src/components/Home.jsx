import React from 'react'
import HeroSection from './HeroSection'
import Navbar from './Utils/Navbar'
import CategoryCorousel from './CategoryCorousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCorousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home