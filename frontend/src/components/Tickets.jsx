import { Ticket, X } from 'lucide-react'
import React, { useState } from 'react'

const Tickets = ({showTickets, setShowTickets,ticketCount, SetTicketCount}) => {

   const [select, setSelect] = useState(null);

  return (
   <div className='relative w-150 border border-red-600/50 rounded-xl bg-black/90 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4),0_0_4px_rgba(239,68,68,0.6)] overflow-hidden'>
  
  
  <div className='flex justify-between items-center px-4 pt-4 pb-3 border-b border-red-600/20'>
    <div className='w-7'></div>
    <h1 className='font-bold flex items-center gap-2 text-xl absolute left-1/2 -translate-x-1/2'>
      <Ticket size={22} />
      Tickets
    </h1>
    <button 
      onClick={() => setShowTickets(false)}
      className='cursor-pointer hover:text-red-400 transition-colors'>
      <X size={24} />
    </button>
  </div>

  
  <div className='px-6 py-6'>
    <p className='text-center text-gray-300 font-semibold text-base mb-5'>How many seats?</p>

    <div className='flex justify-center gap-4 mb-6'>
      {[1,2,3,4,5,6,7,8].map((num) => (
        <button
          key={num}
          onClick={()=> setSelect(num)}
          className='w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all cursor-pointer hover:text-xl'
        >
          {num}
        </button>
      ))}
    </div>

    <div className='border-t border-red-600/20 pt-4'>
      <div className='flex justify-between text-center'>
        <div className='flex-1'>
          <p className='text-xs text-gray-400 tracking-wide'>RECLINER</p>
          <p className='text-lg font-bold text-white mt-1'>₹270</p>
          <p className='text-xs text-green-500 font-semibold mt-0.5'>AVAILABLE</p>
        </div>
        <div className='flex-1'>
          <p className='text-xs text-gray-400 tracking-wide'>STANDARD</p>
          <p className='text-lg font-bold text-white mt-1'>₹180</p>
          <p className='text-xs text-green-500 font-semibold mt-0.5'>AVAILABLE</p>
        </div>
      </div>
    </div>
  </div>


  <div className='px-6 py-3 bg-red-600/5 border-t border-b border-red-600/20 text-sm text-gray-300 text-center'>
    Book the seats in this cinema at no extra cost!
  </div>

  
  <div className='p-4'>
    <button
      className='w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-base transition-colors cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.5)]'
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

export default Tickets
