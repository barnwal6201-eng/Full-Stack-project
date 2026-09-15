import React from 'react'

const Legend = () => {
  return (
      <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
           <div className="flex items-center gap-2">
      <span className="w-4 h-4 rounded bg-gray-800/80 inline-block" />{" "}
        Available
        </div>
    <div className="flex items-center gap-2">
      <span className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-green-700 inline-block" />{" "}
       Selected
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-gray-800 opacity-40 inline-block" />{" "}
      Booked
        </div>
    </div>
  )
}

export default Legend
