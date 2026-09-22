import React from 'react'
import { movieDetailHStyles } from '../assets/dummyStyles'
import { Film } from 'lucide-react'
import PropTypes from 'prop-types'

const Loading = ({loading}) => {
  return (
    <div className={movieDetailHStyles.container}>
                <div className="flex items-center justify-center py-32 text-gray-400 gap-3">
                    <Film className="animate-pulse" size={28} />
                    <span className="text-lg">Loading {loading}</span>
                </div>
     </div>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading
