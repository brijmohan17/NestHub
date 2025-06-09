import React from 'react'
import Listings from '../components/Listings'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Listings/>
      <Footer/>
    </div>
  )
}

export default Home