import React from 'react'
import { movieDetailHStyles } from '../assets/dummyStyles'

const MovieError = ({message}) => {
  return (
    <div className={movieDetailHStyles.notFoundContainer}>
                <div className={movieDetailHStyles.notFoundContent}>
                    <h2 className={movieDetailHStyles.notFoundTitle}>
                        {message}
                    </h2>
                    <Link to="/movies" className={movieDetailHStyles.notFoundLink}>Back to Movies</Link>
                </div>
            </div>
  )
}

export default MovieError
