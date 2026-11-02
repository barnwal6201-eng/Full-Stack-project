import React, { useEffect, useRef, useState } from 'react'
import { trailersCSS, trailersStyles } from '../assets/dummyStyles'
import { Calendar, ChevronLeft, ChevronRight, Clapperboard, Clock, Play } from 'lucide-react'
import { getUploadUrl, formatDuration } from '../utils'
import Loading from '../components/Loading'
import TrailerPlayer from '../components/TrailerPlayer'

const API_BASE = import.meta.env.VITE_API_BASE;
const PLACEHOLDER_THUMB = import.meta.env.VITE_PLACEHOLDER_THUMB;

const resolveImage = (file) => {
  const url = typeof file === 'string' ? file : file?.url;
  return url ? getUploadUrl(url) : null;
};

const mapMovieToTrailerItem = (movie) => {
  const lt = movie.latestTrailers || {};
  const title = lt.title || movie.movieName || "Untitled";
  const thumbnail =
    resolveImage(lt.thumbnail) || resolveImage(movie.poster) || PLACEHOLDER_THUMB;

  const duration =
    formatDuration(movie.duration) || formatDuration(lt.duration) || "";
  const year = lt.year || movie.year || "";

  const genres = lt.genres?.length ? lt.genres : movie.categories || [];
  const genre = genres.join(", ");

  const description = lt.description || movie.story || "";

  const streamUrl = movie.trailerVideo?.streamUrl || "";

  const credits = {};
  const pickFirst = (list) => (list || []).find(Boolean);
  const firstDirector = pickFirst(lt.directors?.length ? lt.directors : movie.directors);
  const firstProducer = pickFirst(lt.producers?.length ? lt.producers : movie.producers);
  const firstSinger = pickFirst(lt.singers?.length ? lt.singers : movie.singers);

  const personImage = (p) =>
    resolveImage(p?.file) || resolveImage(p?.image) || resolveImage(p?.photo) || PLACEHOLDER_THUMB;

  if (firstDirector) {
    credits.Director = { name: firstDirector.name || "Unknown", image: personImage(firstDirector) };
  }
  if (firstProducer) {
    credits.Producer = { name: firstProducer.name || "Unknown", image: personImage(firstProducer) };
  }
  if (firstSinger) {
    credits.Singer = { name: firstSinger.name || "Unknown", image: personImage(firstSinger) };
  }

  return {
    id: movie._id || movie.id,
    title,
    thumbnail,
    streamUrl,
    duration,
    year,
    genre,
    description,
    credits,
  };
};

const Trailer = () => {
  const [trailers, setTrailers] = useState([]);
  const [featuredTrailer, setFeaturedTrailer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/movies?type=latestTrailers&limit=50`, {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const items = Array.isArray(json.items) ? json.items : [];
        const mapped = items.map(mapMovieToTrailerItem);

        setTrailers(mapped);
        setFeaturedTrailer(mapped[0] || null);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to load trailers:", err);
        setError("Failed to load from server");
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, []);

  const scrollBy = (amount) => {
    carouselRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const selectTrailer = (trailer) => {
    setFeaturedTrailer(trailer);
    setIsPlaying(false);

    // Center the selected card in the carousel
    const container = carouselRef.current;
    const el = container?.querySelector(`[data-id="${trailer.id}"]`);
    if (container && el) {
      const rect = el.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      const offset = rect.left - parentRect.left - parentRect.width / 2 + rect.width / 2;
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (loading) {
    return <Loading loading={"trailer..."} />;
  }

  if (error) {
    return (
      <div className={trailersStyles.container}>
        <div className="py-12 text-center text-red-400">{error}</div>
      </div>
    );
  }

  if (trailers.length === 0 || !featuredTrailer) {
    return (
      <div className={trailersStyles.container}>
        <div className="py-12 text-center text-gray-400">No latest trailers yet.</div>
      </div>
    );
  }

  const genres = (featuredTrailer.genre || "")
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);

  return (
    <div className={trailersStyles.container}>
      {featuredTrailer.streamUrl && (
        <TrailerPlayer
          src={featuredTrailer.streamUrl}
          isOpen={isPlaying}
          onClose={() => setIsPlaying(false)}
        />
      )}

      <main className={trailersStyles.main}>
        <div className={trailersStyles.layout}>
          {/* Left side: carousel and list */}
          <div className={trailersStyles.leftSide}>
            <div className={trailersStyles.leftCard}>
              <h2 className={trailersStyles.leftTitle} style={{ fontFamily: "Monoton, cursive" }}>
                <Clapperboard className={trailersStyles.titleIcon} />
                Latest Trailers
              </h2>

              <div className={trailersStyles.carouselControls}>
                <div className={trailersStyles.controlButtons}>
                  <button onClick={() => scrollBy(-280)} className={trailersStyles.controlButton}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => scrollBy(280)} className={trailersStyles.controlButton}>
                    <ChevronRight size={18} />
                  </button>
                </div>
                <span className={trailersStyles.trailerCount}>{trailers.length} trailers</span>
              </div>

              <div
                ref={carouselRef}
                className={trailersStyles.carousel}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {trailers.map((trailer) => (
                  <div
                    key={trailer.id}
                    data-id={trailer.id}
                    className={`${trailersStyles.carouselItem.base} ${
                      featuredTrailer.id === trailer.id
                        ? trailersStyles.carouselItem.active
                        : trailersStyles.carouselItem.inactive
                    }`}
                    style={{ width: "220px", height: "124px", minWidth: "220px" }}
                    onClick={() => selectTrailer(trailer)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") selectTrailer(trailer);
                    }}
                    aria-pressed={featuredTrailer.id === trailer.id}
                  >
                    <img
                      src={trailer.thumbnail}
                      alt={trailer.title}
                      className={trailersStyles.carouselImage}
                      loading="lazy"
                    />
                    <div className={trailersStyles.carouselOverlay}>
                      <h3 className={trailersStyles.carouselTitle}>{trailer.title}</h3>
                      <p className={trailersStyles.carouselGenre}>{trailer.genre}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={trailersStyles.trendingSection}>
                <div className={trailersStyles.trendingTitle}>
                  {trailers.slice(0, 3).map((trailer) => (
                    <div
                      key={trailer.id}
                      onClick={() => selectTrailer(trailer)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") selectTrailer(trailer);
                      }}
                      className={trailersStyles.trendingItem}
                    >
                      <div className={trailersStyles.trendingImage}>
                        <img
                          src={trailer.thumbnail}
                          alt={trailer.title}
                          className={trailersStyles.trendingImageSrc}
                          loading="lazy"
                        />
                      </div>
                      <div className={trailersStyles.trendingContent}>
                        <h4 className={trailersStyles.trendingItemTitle}>{trailer.title}</h4>
                        <p className={trailersStyles.trendingItemGenre}>{trailer.genre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={trailersStyles.rightSide}>
            <div className={trailersStyles.rightCard}>
              <div className={trailersStyles.videoContainer}>
                <div className={trailersStyles.thumbnailContainer}>
                  <img
                    src={featuredTrailer.thumbnail}
                    alt={featuredTrailer.title}
                    className={trailersStyles.thumbnailImage}
                    loading="eager"
                  />
                  <div className={trailersStyles.playButtonContainer}>
                    <button
                      onClick={() => setIsPlaying(true)}
                      disabled={!featuredTrailer.streamUrl}
                      className={trailersStyles.playButton}
                      title={featuredTrailer.streamUrl ? "Play trailer" : "Trailer is not ready yet"}
                    >
                      <Play size={32} fill="white" />
                    </button>
                  </div>
                </div>
              </div>

              <div className={trailersStyles.trailerInfo}>
                <div className={trailersStyles.infoHeader}>
                  <h2 className={trailersStyles.trailerTitle}>{featuredTrailer.title}</h2>

                  <div className={trailersStyles.trailerMeta}>
                    {featuredTrailer.duration && (
                      <span className={trailersStyles.metaItem}>
                        <Clock size={16} className={trailersStyles.metaIcon} />
                        {featuredTrailer.duration}
                      </span>
                    )}
                    {featuredTrailer.year && (
                      <span className={trailersStyles.metaItem}>
                        <Calendar size={16} className={trailersStyles.metaIcon} />
                        {featuredTrailer.year}
                      </span>
                    )}
                  </div>
                </div>

                <div className={trailersStyles.genreContainer}>
                  {genres.map((genre, index) => (
                    <span key={index} className={trailersStyles.genreTag}>
                      {genre}
                    </span>
                  ))}
                </div>

                <p className={trailersStyles.description}>{featuredTrailer.description}</p>

                <div className={trailersStyles.credits}>
                  <h3 className={trailersStyles.creditsTitle}>Credits</h3>

                  <div className={trailersStyles.creditsGrid}>
                    {Object.entries(featuredTrailer.credits || {}).map(([role, person]) => (
                      <div key={role} className={trailersStyles.creditItem}>
                        <div className={trailersStyles.creditImage}>
                          <img
                            src={person.image}
                            alt={person.name}
                            className={trailersStyles.creditImageSrc}
                            loading="lazy"
                          />
                        </div>
                        <div className={trailersStyles.creditName}>{person.name}</div>
                        <div className={trailersStyles.creditRole}>{role}</div>
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
  );
};

export default Trailer;