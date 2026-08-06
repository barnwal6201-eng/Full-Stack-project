import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import ListMovies from './pages/ListMovies'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/listmovies" element={<ListMovies />} /> 
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
