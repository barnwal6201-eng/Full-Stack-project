import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Movie from './pages/Movie'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='/movies' element={<Movie />} />
    </Routes>
    </>
  )
}

export default App
