import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Movie from './pages/Movie'
import Release from './pages/Release'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import MovieDetailPage from './pages/MovieDetailPage'
import MovieDetailPageHome from './pages/MovieDetailPageHome'
import SeatSealector from './pages/SeatSealector'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='/movies' element={<Movie />} />
      <Route path='/releases' element={<Release />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/bookings' element={<Booking />} />

      <Route path='/movie/:id' element={<MovieDetailPage />} />
      <Route path='/movies/:id' element={<MovieDetailPageHome />} />

      <Route path='/movies/:id/seat-selector/:slot' element={<SeatSealector />} />
      <Route path='/movie/:id/seat-selector/:slot' element={<SeatSealector />} />
    </Routes>
    </>
  )
}

export default App
