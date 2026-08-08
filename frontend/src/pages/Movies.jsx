import React, { useEffect, useState } from 'react'
import { moviesStyles } from '../assets/dummyStyles'
import movies from '../assets/dummymoviedata'
import { Link } from 'react-router-dom';
import { Tickets } from 'lucide-react';
import React from 'react';

const PLACEHOLDER_IMG = import.meta.env.VITE_PLACEHOLDER_IMG;
const API_BASE = import.meta.env.VITE_API_BASE;

const getUploadUrl = (maybe) => {
  if(!maybe) return null;
  if(typeof maybe !== 'string') return null;
  if(maybe.startsWith("http://") || maybe.startsWith("https://")) return maybe;
  return `${API_BASE}/uploads/${String(maybe).replace(/^uploads\//, "")}`;
}

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    async function loadFeaturedMovies() {
        try {
            const url = `${API_BASE}/api/movies?featured=true&limit=6`;
        } catch (err) {
            
        }
    }
  })

  const visibleMovies = movies.slice(0, 6);

  return (
    <section className={moviesStyles.container}>
        <style>
         {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Pacifico&display=swap');`}
        </style>

        <h2 className={moviesStyles.title} style={{fontFamily: "'Dancing Script', cursive"}}>
            Featured Movies
        </h2>

        <div className={moviesStyles.grid}>
            {visibleMovies.map((m)=>(
                <article key={m.id} className={moviesStyles.movieArticle}>
                    <Link to={`/movies/${m.id}`} className={moviesStyles.movieLink}>
                    <img src={m.img} alt={m.title} loading='lazy' className={moviesStyles.movieImage} />
                    </Link>

                    <div className={moviesStyles.movieInfo}>
                        <div className={moviesStyles.titleContainer}>
                            <Tickets className={moviesStyles.ticketsIcon}/>
                            <span id={`movie-title-${m.id}`} className={moviesStyles.movieTitle}
                            style={{ fontFamily: "'Pacifico', cursive"}}>
                                {m.title}
                            </span>
                        </div>

                        <div className={moviesStyles.categoryContainer}>
                            <span className={moviesStyles.categoryText}> {m.category}</span>
                        </div>
                    </div>
                </article>
            ))}
        </div>

    </section>
  )
}

export default Movies
