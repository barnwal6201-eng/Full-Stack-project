import { Ticket, X } from 'lucide-react'
import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Tickets = ({setShowTickets,ticketCount, SetTicketCount}) => {

   const [select, setSelect] = useState(null);

  return (
   <div className='relative w-full max-w-md border border-gray-700 rounded-3xl bg-gray-900 text-gray-100 shadow-xl shadow-black/25 overflow-hidden'>
  
  
  <div className='flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-700/80 bg-gray-900/90'>
    <div className='w-10'></div>
    <h1 className='font-semibold flex items-center gap-2 text-lg absolute left-1/2 -translate-x-1/2 tracking-tight'>
      <Ticket size={20} className='text-[#9298fb]' />
      Tickets
    </h1>
    <button 
      onClick={() => setShowTickets(false)}
      aria-label='Close ticket selector'
      className='w-10 h-10 flex items-center justify-center cursor-pointer rounded-xl bg-gray-800 text-gray-400 border border-gray-700 hover:text-white hover:bg-gray-700 transition-colors'>
      <X size={20} />
    </button>
  </div>

  
  <div className='px-5 sm:px-6 py-6'>
    <p className='text-center text-gray-200 font-medium text-base mb-5'>How many seats?</p>

    <div className='grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6'>
      {[1,2,3,4,5,6,7,8].map((num) => (
        <button
          key={num}
          onClick={()=> 
            setSelect(num)
          }
          aria-pressed={select === num || (select === null && ticketCount === num)}
          className={`min-w-0 h-11 flex items-center justify-center rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
            select === num || (select === null && ticketCount === num)
              ? 'bg-[#5961ea] text-white border-[#9298fb] shadow-sm ring-2 ring-[#9298fb]/40'
              : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-[#5961ea]/50 hover:bg-[#5961ea]/10'
          }`}
        >
          {num}
        </button>
      ))}
    </div>

    <div className='border-t border-gray-700/80 pt-5'>
      <div className='grid grid-cols-2 gap-3 text-center'>
        <div className='rounded-2xl bg-gray-950/60 border border-gray-800 px-3 py-4'>
          <p className='text-xs text-gray-400 tracking-[0.12em] font-semibold'>RECLINER</p>
          <p className='text-lg font-bold text-white mt-1.5'>₹270</p>
          <p className='text-[11px] text-green-400 font-medium mt-1'>AVAILABLE</p>
        </div>
        <div className='rounded-2xl bg-gray-950/60 border border-gray-800 px-3 py-4'>
          <p className='text-xs text-gray-400 tracking-[0.12em] font-semibold'>STANDARD</p>
          <p className='text-lg font-bold text-white mt-1.5'>₹180</p>
          <p className='text-[11px] text-green-400 font-medium mt-1'>AVAILABLE</p>
        </div>
      </div>
    </div>
  </div>


  <div className='px-5 sm:px-6 py-3.5 bg-[#5961ea]/[0.06] border-t border-b border-[#5961ea]/15 text-sm text-gray-300 text-center leading-relaxed'>
    Book the seats in this cinema at no extra cost!
  </div>

  
  <div className='p-5 sm:p-6'>
    <button
      className='w-full min-h-12 py-3 rounded-xl bg-[#5961ea] hover:bg-[#4247c2] text-white font-semibold text-base transition-all cursor-pointer shadow-sm hover:-translate-y-0.5'
      onClick={()=>{
        SetTicketCount(select)
         setShowTickets(false)
    }}
    >
      Select Seats
    </button>
  </div>
</div>
  )
}

Tickets.propTypes = {
  setShowTickets: PropTypes.func.isRequired,
  ticketCount: PropTypes.number.isRequired,
  SetTicketCount: PropTypes.func.isRequired,
};

export default Tickets