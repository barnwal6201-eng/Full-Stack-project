import React from 'react'

const FallbackAvatar = ({className = "w-12 h-12", alt = "avatar"}) => {
  return (
   <div
     className={`${className} bg-gray-700 rounded-full flex items-center justify-center text-sm text-gray-300`}
     aria-hidden='true'
     >
        ?
     </div>
    
  )
}

export default FallbackAvatar
