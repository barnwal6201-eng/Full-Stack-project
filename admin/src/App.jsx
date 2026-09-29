import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import ListMovies from './pages/ListMovies'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import LoginPage from './LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
        <Route path="/" element={ <Home />} />
        <Route path="/listmovies" element={<ListMovies />} /> 
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/bookings' element={<Bookings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
