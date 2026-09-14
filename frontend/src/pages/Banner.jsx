import React, { useState } from 'react'
import { bannerStyles } from '../assets/dummyStyles'
import { Info, Star, Tickets } from 'lucide-react'
import Rating from '../components/Rating'
import VideoComponent from '../components/VideoComponent'

const Banner = () => {
    const[isEdit, setIsEdit] = useState(false);

  return (
    <div className={bannerStyles.container}>
      <VideoComponent />

      {/*Content */}
      <div className={bannerStyles.content}>
        <div className={bannerStyles.contentInner}>
            <h1 className={bannerStyles.title} style={{
                fontFamily: "'Dancing Script', cursive",
            }}>
                Oceans's Legacy
            </h1>

            <p className={bannerStyles.description}>
                An epic adventure beneath the waves. Explore the mysteries of the deep ocean and discover treasures beyond
                imagination in this breathtaking cinematic experience.
            </p>

            {/* make rating componet 
               1. make sure it is configurable  -> 1. read only 2. read and write 

               <Star data={data } edit={true} update={} />
             */}
            <Rating
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            />

            <div className={bannerStyles.buttonsContainer}>
                <a href="/movies" className={bannerStyles.bookButton}>
                <Tickets className={bannerStyles.icon} fill='white' />
                Book Movies
                </a>

                <a href="/contact" className={bannerStyles.infoButton}>
                <Info className={bannerStyles.icon} />
                More Info
                </a>
            </div>
            <div className='w-35 mt-4 font-[pacifico]'
             onClick={() => setIsEdit(true)}
            >
                <a href="/rating" className={bannerStyles.bookButton}>
                <Star className={bannerStyles.icon} fill='yellow' />
                Rate us
                </a>
            </div>
        </div>
      </div>

      <style>{bannerStyles.customCSS}</style>
    </div>
  )
}

export default Banner
