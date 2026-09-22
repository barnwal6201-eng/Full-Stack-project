import React from 'react'
import propTypes from 'prop-types'

const FallbackAvatar = ({className = "w-12 h-12", alt = "avatar"}) => {
  return (
   <div
     className={`${className} bg-gray-700 rounded-full flex items-center justify-center text-sm text-gray-300`}
     aria-hidden='true' 
     aria-label={alt}
     >
        ?
     </div>
    
  )
}

FallbackAvatar.propTypes = {
  className: propTypes.string,
  alt: propTypes.string,
}

export default FallbackAvatar
