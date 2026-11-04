import React, { useEffect, useRef, useState } from 'react'
import { trailersCSS, trailersStyles as s } from '../assets/dummyStyles'
import { Calendar, ChevronLeft, ChevronRight, Clapperboard, Clock, Play } from 'lucide-react'
import { getUploadUrl, formatDuration } from '../utils'
import Loading from '../components/Loading'
import TrailerPlayer from '../components/TrailerPlayer'

const API_BASE = import.meta.env.VITE_API_BASE
const PLACEHOLDER_THUMB = import.meta.env.VITE_PLACEHOLDER_THUMB

const resolveImage = (file) => {
  const url = typeof file === 'string' ? file : file?.url
  return url ? getUploadUrl(url) : null
}

const personImage = (p) =>
  resolveImage(p?.preview) || resolveImage(p?.file) || resolveImage(p?.image) || PLACEHOLDER_THUMB

const pickCredit = (role, person) =>
  person && { role, name: person.name || 'Unknown', image: personImage(person) }

const mapMovie = (movie) => {
  const lt = movie.latestTrailers || {}
  const genres = lt.genres?.length ? lt.genres : movie.categories || []
  const first = (list) => (list || []).find(Boolean)

  return {
    id: movie._id || movie.id,
    title: lt.title || movie.movieName || 'Untitled',
    thumbnail: resolveImage(lt.thumbnail) || resolveImage(movie.poster) || PLACEHOLDER_THUMB,
    streamUrl: movie.trailerVideo?.streamUrl || '',
    duration: formatDuration(movie.duration) || formatDuration(lt.duration) || '',
    year: lt.year || movie.year || '',
    genres,
    description: lt.description || movie.story || '',
    credits: [
      pickCredit('Director', first(lt.directors?.length ? lt.directors : movie.directors)),
      pickCredit('Producer', first(lt.producers?.length ? lt.producers : movie.producers)),
      pickCredit('Singer', first(lt.singers?.length ? lt.singers : movie.singers)),
    ].filter(Boolean),
  }
}

const keyHandler = (fn) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') fn()
}

const Trailer = () => {
  const [trailers, setTrailers] = useState([])
  const [featured, setFeatured] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const carouselRef = useRef(null)

  useEffect(() => {
    const ac = new AbortController()
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/movies?type=latestTrailers&limit=50`, {
          signal: ac.signal,
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        const mapped = (json.items || []).map(mapMovie)
        setTrailers(mapped)
        setFeatured(mapped[0] || null)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('Failed to load trailers:', err)
        setError('Failed to load from server')
      } finally {
        if (!ac.signal.aborted) setLoading(false)
      }
    })()
    return () => ac.abort()
  }, [])

  const scrollCarousel = (amount) =>
    carouselRef.current?.scrollBy({ left: amount, behavior: 'smooth' })

  const selectTrailer = (trailer) => {
    setFeatured(trailer)
    setIsPlaying(false)
    const container = carouselRef.current
    const el = container?.querySelector(`[data-id="${trailer.id}"]`)
    if (container && el) {
      const offset =
        el.getBoundingClientRect().left -
        container.getBoundingClientRect().left -
        container.clientWidth / 2 +
        el.clientWidth / 2
      container.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  if (loading) return <Loading loading="trailer..." />
  if (error) return <div className={s.container}><div className="py-12 text-center text-red-400">{error}</div></div>
  if (!featured) return <div className={s.container}><div className="py-12 text-center text-gray-400">No latest trailers yet.</div></div>

  const selectHandler = (t) => ({
    onClick: () => selectTrailer(t),
    onKeyDown: keyHandler(() => selectTrailer(t)),
    role: 'button',
    tabIndex: 0,
  })

  return (
    <div className={s.container}>
      <main className={s.main}>
        <div className={s.layout}>
          {/* Left: carousel and list */}
          <div className={s.leftSide}>
            <div className={s.leftCard}>
              <h2 className={s.leftTitle} style={{ fontFamily: 'Monoton, cursive' }}>
                <Clapperboard className={s.titleIcon} />
                Latest Trailers
              </h2>

              <div className={s.carouselControls}>
                <div className={s.controlButtons}>
                  <button onClick={() => scrollCarousel(-280)} className={s.controlButton}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => scrollCarousel(280)} className={s.controlButton}>
                    <ChevronRight size={18} />
                  </button>
                </div>
                <span className={s.trailerCount}>{trailers.length} trailers</span>
              </div>

              <div ref={carouselRef} className={s.carousel} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {trailers.map((t) => {
                  const active = featured.id === t.id
                  return (
                    <div
                      key={t.id}
                      data-id={t.id}
                      {...selectHandler(t)}
                      className={`${s.carouselItem.base} ${active ? s.carouselItem.active : s.carouselItem.inactive}`}
                      style={{ width: '220px', height: '124px', minWidth: '220px' }}
                      aria-pressed={active}
                    >
                      <img src={t.thumbnail} alt={t.title} className={s.carouselImage} loading="lazy" />
                      <div className={s.carouselOverlay}>
                        <h3 className={s.carouselTitle}>{t.title}</h3>
                        <p className={s.carouselGenre}>{t.genres.join(', ')}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className={s.trendingSection}>
                <div className={s.trendingTitle}>
                  {trailers.slice(0, 3).map((t) => (
                    <div key={t.id} {...selectHandler(t)} className={s.trendingItem}>
                      <div className={s.trendingImage}>
                        <img src={t.thumbnail} alt={t.title} className={s.trendingImageSrc} loading="lazy" />
                      </div>
                      <div className={s.trendingContent}>
                        <h4 className={s.trendingItemTitle}>{t.title}</h4>
                        <p className={s.trendingItemGenre}>{t.genres.join(', ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: player and info */}
          <div className={s.rightSide}>
            <div className={s.rightCard}>
              <div className={s.videoContainer}>
                <div className={s.thumbnailContainer}>
                  {isPlaying && featured.streamUrl ? (
                    <TrailerPlayer key={featured.id} src={featured.streamUrl} isOpen inline />
                  ) : (
                    <>
                      <img src={featured.thumbnail} alt={featured.title} className={s.thumbnailImage} loading="eager" />
                      <div className={s.playButtonContainer}>
                        <button
                          onClick={() => setIsPlaying(true)}
                          disabled={!featured.streamUrl}
                          className={s.playButton}
                          title={featured.streamUrl ? 'Play trailer' : 'Trailer is not ready yet'}
                        >
                          <Play size={32} fill="white" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={s.trailerInfo}>
                <div className={s.infoHeader}>
                  <h2 className={s.trailerTitle}>{featured.title}</h2>
                  <div className={s.trailerMeta}>
                    {featured.duration && (
                      <span className={s.metaItem}><Clock size={16} className={s.metaIcon} />{featured.duration}</span>
                    )}
                    {featured.year && (
                      <span className={s.metaItem}><Calendar size={16} className={s.metaIcon} />{featured.year}</span>
                    )}
                  </div>
                </div>

                <div className={s.genreContainer}>
                  {featured.genres.map((g) => (
                    <span key={g} className={s.genreTag}>{g}</span>
                  ))}
                </div>

                <p className={s.description}>{featured.description}</p>

                <div className={s.credits}>
                  <h3 className={s.creditsTitle}>Credits</h3>
                  <div className={s.creditsGrid}>
                    {featured.credits.map((c) => (
                      <div key={c.role} className={s.creditItem}>
                        <div className={s.creditImage}>
                          <img src={c.image} alt={c.name} className={s.creditImageSrc} loading="lazy" />
                        </div>
                        <div className={s.creditName}>{c.name}</div>
                        <div className={s.creditRole}>{c.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <style>{trailersCSS}</style>
    </div>
  )
}

export default Trailer