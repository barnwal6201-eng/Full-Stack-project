import React ,{useState} from 'react'
import { Star, Clapperboard, ArrowLeft } from 'lucide-react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function getStoredToken() {
  return(
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    null
  )
}

const UserRating = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
   const [task, setTask] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
   });
   const navigate = useNavigate();

   try{
   const token = getStoredToken();
      if(!token){
        navigate('/login');
        return;
      } 
   }catch(err){
    console.error(err);
   } 

  function handleSubmit(e){
    e.preventDefault();
    if(title.trim() === ''){
     toast.error("Please Fill your experience");
    }else{
      const copyTask = [...task, {title, rating}];
    
     setTask(copyTask);
     localStorage.setItem('tasks', JSON.stringify(copyTask));
    setTitle('');
    setRating(0);
    }
  }

  return (
    <main className='min-h-screen bg-gray-950 px-4 pb-16 pt-6 text-gray-100 sm:px-6 sm:pt-8'>
      <div className='mx-auto mb-8 flex w-full max-w-6xl justify-start sm:mb-10'>
        <button onClick={() => navigate(-1)}
          className='group inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-[#747bf9]/40 hover:bg-gray-800 hover:text-white' >
          <ArrowLeft size={18} className='transition-transform group-hover:-translate-x-0.5' />
          Back
        </button>
      </div>
      <div className='mx-auto w-full max-w-3xl'>
        <header className='mb-8 text-center sm:mb-10'>
          <div className='mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#747bf9]/25 bg-[#5961ea]/10'>
            <Star size={23} fill='#f7c96b' className='text-[#f7c96b]' aria-hidden='true' />
          </div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9298fb]'>Your movie experience</p>
          <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>Ratings &amp; reviews</h1>
          <p className='mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-400 sm:text-base'>Share what you thought and see your reviews in one place.</p>
        </header>

        <section className='mb-5 rounded-2xl border border-gray-700 bg-gray-900/80 p-5 shadow-sm sm:p-7' aria-label='Movie rating summary'>
          <div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
            <div className='min-w-0'>
              <h2 className=' flex gap-2 text-xl font-semibold tracking-tight text-white sm:text-3xl'>
                <Clapperboard size={28} className='mt-1' />
                 CineVerse
              </h2>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <span className='inline-flex min-h-11 items-center rounded-xl border border-gray-700 bg-gray-800 px-4 text-sm font-medium text-gray-200'>
                <Star size={16} className='mr-2 text-[#f7c96b]' aria-hidden='true' />
                8/10
              </span>
              <a type='button'
              href="/movies"
              className='inline-flex min-h-11 items-center justify-center rounded-xl border border-[#747bf9]/50 bg-[#5961ea] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#4247c2]'>Book Ticket</a>
            </div>
          </div>
        </section>

        <section className='rounded-2xl border border-gray-700 bg-gray-900/80 p-5 shadow-sm sm:p-7' aria-label='Write a review'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold tracking-tight text-white sm:text-2xl'>Leave a review</h2>
            <p className='mt-1 text-sm leading-6 text-gray-400'>Tell us about your experience with this movie.</p>
          </div>

          <div className='mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-700 bg-gray-950/50 px-4 py-3'>
            <label htmlFor='user-rating-score' className='text-sm font-medium text-gray-200'>Your rating</label>
            <div className='flex items-center gap-2'>
              <input
               id='user-rating-score'
                type='number'
                 value={rating}
                 onChange={(e) => setRating(e.target.value)}
                 max={10} min={2} maxLength={1} aria-label='Your rating' className='h-11 w-16 rounded-lg border border-gray-600 bg-gray-800 px-2 text-center text-base font-semibold text-white outline-none transition-colors hover:border-[#747bf9] focus:border-[#9298fb]' />
              <span className='text-sm text-gray-400'>/ 10</span>
              <Star size={18} className='text-[#f7c96b]' aria-hidden='true' />
            </div>
          </div>

          <label htmlFor='user-rating-review' className='mb-2 block text-sm font-medium text-gray-200'>Please give your review</label>
          <input type='text'
            id='user-rating-review'
            placeholder='Write your experience and press Enter'
            className='min-h-12 w-full rounded-xl border border-gray-600 bg-gray-950/60 px-4 py-3 text-sm font-medium text-white outline-none transition-colors placeholder:text-gray-500 hover:border-[#747bf9] focus:border-[#9298fb]'
            value={title}
            onChange={(e)=>{
              setTitle(e.target.value)
            } }
          />
          <button onClick={handleSubmit} className='border-gray-700 h-10 w-35 active:bg-gray-800 border-3 rounded mt-3 '>Add Review</button>

          <div className='mt-8 border-t border-gray-700 pt-6'>
            <h3 className='mb-4 text-base font-semibold text-white'>Your reviews</h3>
            <div className='grid gap-3 sm:grid-cols-2'>
              {task.map(function(elem, idx){
                return <div key={idx}
                  className='flex min-w-0 items-start justify-between gap-3 rounded-xl border border-gray-700 bg-gray-950/50 p-4 text-sm leading-6 text-gray-200'
                >
                  <p className='min-w-0 break-words'>{elem.title}</p>
                  <span className='flex gap-1'>{elem.rating}/10 <Star className='mt-1' size={18} fill='yellow' /></span>
                </div>
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default UserRating