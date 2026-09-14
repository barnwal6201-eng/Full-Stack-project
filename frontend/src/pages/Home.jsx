import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../pages/Banner'
import Movies from '../pages/Movies'
import Trailer from '../pages/Trailer'
import News from '../pages/News'
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
