import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Movie from './pages/Movie'
import Release from './pages/Release'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import MovieDetailPage from './pages/MovieDetailPage'
import MovieDetailPageHome from './pages/MovieDetailPageHome'
import SeatSelectorPageHome from './components/SeatSelectorPageHome'
import SeatSelectorPage from './components/SeatSelectorPage'
import { ToastContainer } from 'react-toastify'

/**
 * ScrollToTop component
 * -Forces an immediate jump to the very top on every navigation.
 * -If URL has a hash, it will try to jump to that element (also immediately).
 * -Disables browser's automatic scroll restoration to avoid the browser restoring previous position.
 */
function ScrollToTop() {
  const location = useLocation();

  //Disable browser auto scroll restoration (do once)
  useEffect(() => {
    if(typeof window !== "undefined" && "scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = 'manual';
        
      } catch (err) {
        //ignore
      }
      
    }
    console.log("lalita")
  },[]);

  useEffect(() => {
    //if there is a hash (e.g. /page#section), try to jump to that element
    if(location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id) || document.querySelector(location.hash);
      if(el) {
        el.scrollIntoView({behavior: "auto", block: "start", inline: "nearest"});
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        return;
      }
    }

    //force immediate top-of-page
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search, location.hash]);

  return null;
}

const App = () => {

  //Ensure no horizontal overflow on the root document(defensive)
  useEffect(() => {
    const prevHtmlOverflowX = document.documentElement.style.overflowX;
    const prevBodyOverflowX = document.body.style.overflowX;

    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    return () => {
      //restore previous values just in case other scripts rely on time
      document.documentElement.style.overflowX = prevHtmlOverflowX;
      document.body.style.overflowX = prevBodyOverflowX;
    }
  }, []);

  return (
    <>
     <ToastContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='black'
      />

    <ScrollToTop />
    <div className='min-h-screen w-full overflow-x-hidden'>
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

      <Route path='/movies/:id/seat/:slot' element={<SeatSelectorPage />} />
      <Route path='/movies/:id/seat-selector/:slot' element={<SeatSelectorPage />} />

      
      <Route path='/movie/:id/seat/:slot' element={<SeatSelectorPageHome />} />
      <Route path='/movie/:id/seat-selector/:slot' element={<SeatSelectorPageHome />} />

    </Routes>
    </div>
    </>
  )
}

export default App
