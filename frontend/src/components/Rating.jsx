import React from 'react'
import { Star } from 'lucide-react'
import { bannerStyles } from '../assets/dummyStyles'

const Rating = () => { 
  return (
    <>
        <div className={bannerStyles.ratingGenreContainer}>
                <div className={bannerStyles.ratingContainer}>
                    <div className={bannerStyles.starsContainer}>
                        {[1,2,3,4,5].map((star) => (
                            <Star
                            key={star}
                            className={bannerStyles.star}
                            aria-hidden="true"
                            />
                        ))}
                    </div>
                    <span className={bannerStyles.ratingText}>4.8/5</span>
                </div>

                <div className={bannerStyles.genreText}>
                    Adventure ● Fantasy ● Drama
                </div>
            </div>
      </>
    
  )
}

export default Rating
