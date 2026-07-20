import React from 'react'
import Navbar from '../components/Navbar'
import Banner from './Banner'
import Movies from './Movies'
import Trailer from './Trailer'
import News from './News'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Movies />
      <Trailer />
      <News />
      <Footer />
    </div>
  )
}

export default Home
