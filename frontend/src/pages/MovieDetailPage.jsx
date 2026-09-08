import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { movieDetailCSS, movieDetailStyles } from '../assets/dummyStyles'
import { toast } from 'react-toastify'
import { ArrowLeft, Calendar, Clock, Film, ImageOff, Play, Star, User, X } from 'lucide-react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE;

const ROWS = [
    { id: 'A', type: 'Standard', count: 8 },
    { id: 'B', type: 'Standard', count: 8 },
    { id: 'C', type: 'Standard', count: 8 },
    { id: 'D', type: 'recliner', count: 8 },
    { id: 'E', type: 'recliner', count: 8 },
];

const TOTAL_SEATS = ROWS.reduce((s, r) => s + r.count, 0);

const FallbackAvatar = ({ className = "w-12 h-12" }) => (
    <div
        className={`${className} bg-gray-700 rounded-full flex items-center justify-center text-sm text-gray-300`}
        aria-hidden='true'
    >
        ?
    </div>
);

/** Utility: extract a youtube id from either an id or a full url */
export function extractYouTubeId(urlOrId) {
    if (!urlOrId) return null;
    if (/^[A-Za-z0-9_-]{6,}$/.test(urlOrId)) return urlOrId;
    const re =
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i;
    const m = urlOrId.match(re);
    return m ? m[1] : null;
};

const getEmbedUrl = (id) =>
    id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;

/** Converts "10:30" + "AM"/"PM" -> "10:30" 24h "HH:MM" */
const to24Hour = (timeStr = "00:00", ampm = "") => {
    const [hRaw = "0", mRaw = "00"] = String(timeStr).split(":");
    let h = Number(hRaw || 0);
    const m = String(Number(mRaw) || 0).padStart(2, "0");
    const a = (ampm || "").toUpperCase();
    if (a === "AM" && h === 12) h = 0;
    if (a === "PM" && h !== 12) h += 12;
    return `${String(h).padStart(2, "0")}:${m}`;
};

/**
 * Backend slots look like: { date: "2026-08-10", time: "10:30", ampm: "AM" }
 * Build a real ISO datetime string (assumed IST, +05:30) from that shape.
 * Also tolerates already-ISO strings or other object shapes, for resilience.
 */
const slotToISO = (slot) => {
    if (!slot) return null;
    if (typeof slot === "string") return slot;
    if (typeof slot === "object") {
        if (slot.date && slot.time) {
            const hhmm = to24Hour(slot.time, slot.ampm || "");
            return `${slot.date}T${hhmm}:00+05:30`;
        }
        if (slot.datetime) return slot.datetime;
        if (slot.iso) return slot.iso;
    }
    return null;
};

const getParts = (dateLike, timeZone) => {
    const dt = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
    const parts = new Intl.DateTimeFormat("en", {
        timeZone, year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hour12: true,
    }).formatToParts(dt);
    const map = {};
    for (const p of parts) if (p.type !== "literal") map[p.type] = p.value;
    map.dayPeriod = map.dayPeriod || map.ampm || map.AMPM;
    return map;
};

const formatDateKey = (dateLike, timeZone = "Asia/Kolkata") => {
    const p = getParts(dateLike, timeZone);
    return `${p.year}-${p.month}-${p.day}`;
};

const formatTimeInTZ = (dateLike, timeZone = "Asia/Kolkata") => {
    const p = getParts(dateLike, timeZone);
    const hour = String(Number(p.hour));
    return `${hour}:${p.minute} ${String(p.dayPeriod ?? "").toUpperCase()}`;
};

const getAuthToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt") || null;

/** duration arrives as minutes (NumberInt) e.g. 158 -> "2h 38m" */
const formatDuration = (duration) => {
    if (duration === null || duration === undefined || duration === "") return null;
    const mins = Number(duration);
    if (Number.isNaN(mins)) return String(duration);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const MovieDetailPage = () => {
    const { id } = useParams();
    const movieId = id;
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [bookedCounts, setBookedCounts] = useState({});
    const [posterFailed, setPosterFailed] = useState(false);

    const [showTrailer, setShowTrailer] = useState(false);
    const [selectedTrailerId, setSelectedTrailerId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);

    // Fetch movie from backend
    useEffect(() => {
        let mounted = true;
        const fetchMovie = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                const res = await axios.get(
                    `${API_BASE}/api/movies/${encodeURIComponent(movieId)}`
                );
                const data = res?.data;
                if (!mounted) return;

                if (!data || data.success === false) {
                    const msg = (data && data.message) || "Failed to load movie";
                    setFetchError(msg);
                    toast.error(msg);
                    setMovie(null);
                } else {
                    const item =
                        data.item ||
                        data.data ||
                        (data.success && data.movie) ||
                        (data.success ? data : null) ||
                        // some endpoints just return the raw document
                        (data._id ? data : null);
                    if (!item) {
                        setFetchError("Movie data was empty in the server response.");
                    }
                    setMovie(item || null);
                }
            } catch (err) {
                console.error("Failed to fetch movie:", err);
                const msg = err?.response?.data?.message || "Failed to fetch movie from server";
                if (mounted) {
                    setFetchError(msg);
                    toast.error(msg);
                    setMovie(null);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (movieId) fetchMovie();
        else {
            setLoading(false);
            setMovie(null);
            setFetchError("No movie id was provided in the URL.");
        }

        return () => { mounted = false; };
    }, [movieId]);

    useEffect(() => {
        setPosterFailed(false);
    }, [movie?.poster]);

    /** Group slots ({date,time,ampm} objects) into days */
    const showTimeDays = useMemo(() => {
        if (!movie) return [];
        const TZ = "Asia/Kolkata";
        const slotsByDate = {};

        const slots = Array.isArray(movie.slots) ? movie.slots : [];

        slots.forEach((slot) => {
            try {
                const iso = slotToISO(slot);
                if (!iso) return;
                const d = new Date(iso);
                if (Number.isNaN(d.getTime())) return;

                const dateKey = formatDateKey(d, TZ);
                if (!slotsByDate[dateKey]) slotsByDate[dateKey] = [];
                slotsByDate[dateKey].push({ iso, audi: movie.auditorium || null });
            } catch (error) {
                // ignore invalid slot
            }
        });

        const dateKeys = Object.keys(slotsByDate).sort();

        return dateKeys.map((key) => {
            const [yy, mm, dd] = key.split("-").map(Number);
            const asDate = new Date(Date.UTC(yy, mm - 1, dd));
            const shortDay = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: TZ }).format(asDate);
            const dateStr = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: TZ }).format(asDate);

            const rawSlots = slotsByDate[key] || [];
            const showTimes = rawSlots
                .map(({ iso, audi }) => {
                    const d = new Date(iso);
                    if (Number.isNaN(d.getTime())) return null;
                    return { time: formatTimeInTZ(iso, TZ), datetime: iso, timestamp: d.getTime(), audi: audi ?? null };
                })
                .filter(Boolean)
                .sort((a, b) => a.timestamp - b.timestamp)
                .map(({ time, datetime, audi }) => ({ time, datetime, audi }));

            return { date: key, shortDay, dateStr, showTimes };
        });
    }, [movie]);

    useEffect(() => {
        if (showTimeDays.length === 0) {
            setSelectedDay(0);
            setSelectedTime(null);
            return;
        }
        setSelectedDay((curr) => (curr >= 0 && curr < showTimeDays.length ? curr : 0));
        setSelectedTime(null);
    }, [showTimeDays]);

    // Fetch real booked-seat counts per showtime (paid bookings only)
    useEffect(() => {
        let cancelled = false;
        const fetchBookedCounts = async () => {
            const mid = movie?._id || movieId;
            if (!mid || showTimeDays.length === 0) return;
            try {
                const token = getAuthToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const res = await axios.get(`${API_BASE}/api/bookings`, {
                    params: { movieId: mid, limit: 1000 },
                    headers,
                    timeout: 8000,
                });
                const data = res?.data;
                let items = [];
                if (Array.isArray(data)) items = data;
                else if (Array.isArray(data?.items)) items = data.items;
                else if (Array.isArray(data?.bookings)) items = data.bookings;

                const counts = {};
                for (const b of items) {
                    const ps = (b.paymentStatus || b.payment_status || "").toString().toLowerCase();
                    if (ps !== "paid") continue;
                    const showRaw = b.showtime || b.slot || b.time || b.showtimeIso || b._iso || null;
                    if (!showRaw) continue;
                    const showDate = new Date(showRaw);
                    if (isNaN(showDate.getTime())) continue;
                    showDate.setSeconds(0, 0);
                    const key = showDate.toISOString();
                    const seatCount = Array.isArray(b.seats) ? b.seats.length : Array.isArray(b.seatIds) ? b.seatIds.length : 0;
                    counts[key] = (counts[key] || 0) + seatCount;
                }
                if (!cancelled) setBookedCounts(counts);
            } catch (err) {
                console.warn("Failed to fetch booked counts:", err?.message || err);
                if (!cancelled) setBookedCounts({});
            }
        };
        fetchBookedCounts();
        return () => { cancelled = true; };
    }, [movie, movieId, showTimeDays]);

    const openTrailer = (movieObj) => {
        const ytId = extractYouTubeId(movieObj?.trailerUrl || movieObj?.trailer || "");
        if (!ytId) {
            toast.info("Trailer not available for this movie");
            return;
        }
        setSelectedMovie(movieObj);
        setSelectedTrailerId(ytId);
        setShowTrailer(true);
    };

    const closeTrailer = () => {
        setSelectedMovie(null);
        setSelectedTrailerId(null);
        setShowTrailer(false);
    };

    const handleTimeSelect = (datetime) => {
        setSelectedTime(datetime);
        const key = encodeURIComponent(datetime);
        navigate(`/movies/${movie._id}/seat-selector/${key}`);
    };

    const handleBookNow = () => {
        if (selectedTime) {
            const key = encodeURIComponent(selectedTime);
            navigate(`/movies/${movie._id}/seat-selector/${key}`);
        } else {
            toast.error("Please select a showtime first");
        }
    };

    const getBookedCountFor = (datetime) => {
        const d = new Date(datetime);
        if (isNaN(d.getTime())) return 0;
        d.setSeconds(0, 0);
        return bookedCounts[d.toISOString()] || 0;
    };

    if (loading) {
        return (
            <div className={movieDetailStyles.container}>
                <div className="flex items-center justify-center py-32 text-gray-400 gap-3">
                    <Film className="animate-pulse" size={28} />
                    <span className="text-lg">Loading movie…</span>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className={movieDetailStyles.notFoundContainer}>
                <div className={movieDetailStyles.notFoundContent}>
                    <h2 className={movieDetailStyles.notFoundTitle}>
                        {fetchError || "Movie not found."}
                    </h2>
                    <Link to="/movies" className={movieDetailStyles.notFoundLink}>Back to Movies</Link>
                </div>
            </div>
        )
    }

    // ---- Field mapping against the real backend schema ----
    const title = movie.movieName || "Untitled";
    const genre = Array.isArray(movie.categories) ? movie.categories.join(", ") : "";
    const durationLabel = formatDuration(movie.duration);
    const ratingLabel = movie.rating !== undefined && movie.rating !== null && movie.rating !== ""
        ? `${movie.rating}/10`
        : null;
    const posterSrc = movie.poster;
    const directors = Array.isArray(movie.directors) ? movie.directors : [];
    const producers = Array.isArray(movie.producers) ? movie.producers : [];
    const cast = Array.isArray(movie.cast) ? movie.cast : [];
    const story = movie.story;

    return (
        <div className={movieDetailStyles.container}>
            {showTrailer && selectedTrailerId && (
                <div className={movieDetailStyles.modalOverlay}>
                    <div className={movieDetailStyles.modalContainer}>
                        <button onClick={closeTrailer} className={movieDetailStyles.closeButton}>
                            <X size={36} />
                        </button>
                        <div className={movieDetailStyles.videoContainer}>
                            <iframe
                                key={selectedTrailerId}
                                width="100%"
                                height="100%"
                                src={getEmbedUrl(selectedTrailerId)}
                                title={`${selectedMovie?.movieName || "Trailer"} Trailer`}
                                frameBorder="0"
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                                className={movieDetailStyles.videoIframe}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className={movieDetailStyles.wrapper}>
                <div className={movieDetailStyles.header}>
                    <Link to='/movies' className={movieDetailStyles.backButton}>
                        <ArrowLeft size={18} />
                        <span className={movieDetailStyles.backText}>Back</span>
                    </Link>
                </div>

                <div className={movieDetailStyles.titleContainer}>
                    <h1
                        className={movieDetailStyles.movieTitle}
                        style={{
                            fontFamily: "'Cinzel', 'Times New Roman', serif",
                            textShadow: "0 4px 20px rgba(220, 38, 38, 0.6)",
                            letterSpacing: "0.08em",
                        }}
                    >
                        {title}
                    </h1>

                    <div className={movieDetailStyles.movieMeta}>
                        {ratingLabel && (
                            <span className={movieDetailStyles.metaItem}>
                                <Star className={`${movieDetailStyles.metaIcon} ${movieDetailStyles.ratingIcon}`} />
                                {ratingLabel}
                            </span>
                        )}
                        {durationLabel && (
                            <span className={movieDetailStyles.metaItem}>
                                <Clock className={`${movieDetailStyles.metaIcon} ${movieDetailStyles.durationIcon}`} />
                                {durationLabel}
                            </span>
                        )}
                        {genre && (
                            <span className={movieDetailStyles.genreTag}>{genre}</span>
                        )}
                    </div>
                </div>

                <div className={movieDetailStyles.mainLayout}>
                    <div className={movieDetailStyles.leftColumn}>
                        <div className={movieDetailStyles.posterCard}>
                            <div
                                className={movieDetailStyles.posterImage}
                                style={{ maxWidth: '320px', aspectRatio: '2 / 3', background: 'rgba(255,255,255,0.03)' }}
                            >
                                {posterSrc && !posterFailed ? (
                                    <img
                                        src={posterSrc}
                                        alt={title}
                                        onError={() => setPosterFailed(true)}
                                        className={movieDetailStyles.posterImg}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 border border-dashed border-gray-700 rounded-xl">
                                        <ImageOff size={32} />
                                        <span className="text-xs">No poster available</span>
                                    </div>
                                )}
                            </div>

                            <button onClick={() => openTrailer(movie)} className={movieDetailStyles.trailerButton}>
                                <Play size={18} />
                                <span>Watch Trailer</span>
                            </button>
                        </div>
                    </div>

                    <div className={movieDetailStyles.rightColumns}>
                        <div className={movieDetailStyles.showtimesCard}>
                            <h3 className={movieDetailStyles.showtimesTitle} style={{ fontFamily: "'Cinzel', serif" }}>
                                <Calendar className={movieDetailStyles.showtimesIcon} />
                                <span>Showtimes</span>
                            </h3>

                            {showTimeDays.length === 0 ? (
                                <div className="text-center text-gray-400 py-8">
                                    No showtimes are currently scheduled for this movie.
                                </div>
                            ) : (
                                <>
                                    <div className={movieDetailStyles.daySelection}>
                                        {showTimeDays.map((day, index) => (
                                            <button
                                                key={day.date}
                                                onClick={() => { setSelectedDay(index); setSelectedTime(null); }}
                                                className={`${movieDetailStyles.dayButton.base} ${
                                                    selectedDay === index
                                                        ? movieDetailStyles.dayButton.active
                                                        : movieDetailStyles.dayButton.inactive
                                                }`}
                                            >
                                                <div className={movieDetailStyles.dayName}>{day.shortDay}</div>
                                                <div className={movieDetailStyles.dayDate}>{day.dateStr}</div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className={movieDetailStyles.showtimesGrid}>
                                        {showTimeDays[selectedDay]?.showTimes.length === 0 ? (
                                            <div className="col-span-full text-center text-gray-500 py-4">
                                                No showtimes on this day.
                                            </div>
                                        ) : (
                                            showTimeDays[selectedDay]?.showTimes.map((showtime, index) => {
                                                const bookedCount = getBookedCountFor(showtime.datetime);
                                                const isSoldOut = bookedCount >= TOTAL_SEATS;
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => !isSoldOut && handleTimeSelect(showtime.datetime)}
                                                        disabled={isSoldOut}
                                                        className={`${movieDetailStyles.timeButton.base} ${
                                                            selectedTime === showtime.datetime
                                                                ? movieDetailStyles.timeButton.active
                                                                : movieDetailStyles.timeButton.inactive
                                                        } ${isSoldOut ? "opacity-50 cursor-not-allowed" : ""}`}
                                                        title={
                                                            isSoldOut
                                                                ? "All seats booked for this showtime"
                                                                : `Seats available: ${Math.max(0, TOTAL_SEATS - bookedCount)}`
                                                        }
                                                        aria-disabled={isSoldOut}
                                                    >
                                                        <span>{showtime.time}</span>
                                                        {isSoldOut && (
                                                            <span className={movieDetailStyles.soldOutBadge}>Sold Out</span>
                                                        )}
                                                    </button>
                                                )
                                            })
                                        )}
                                    </div>
                                </>
                            )}

                            {selectedTime && (
                                <div className={movieDetailStyles.proceedButton}>
                                    <button onClick={handleBookNow} className={movieDetailStyles.bookButton}>
                                        Proceed to Seat Selection
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className={movieDetailStyles.castCard}>
                            <h3 className={movieDetailStyles.castTitle} style={{ fontFamily: "'Cinzel', serif" }}>
                                <User className={movieDetailStyles.castIcon} />
                                <span>Cast</span>
                            </h3>

                            <div className={movieDetailStyles.castGrid}>
                                {cast.length ? (
                                    cast.map((c, idx) => (
                                        <div key={idx} className={movieDetailStyles.castItem}>
                                            <div className={movieDetailStyles.castImageContainer}>
                                                {c.preview ? (
                                                    <img
                                                        src={c.preview}
                                                        alt={c.name}
                                                        className={movieDetailStyles.castImage}
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = "https://via.placeholder.com/80?text=A";
                                                        }}
                                                    />
                                                ) : (
                                                    <FallbackAvatar className='w-20 h-20 mx-auto' />
                                                )}
                                            </div>
                                            <div className={movieDetailStyles.castName}>{c.name || "Unnamed"}</div>
                                            <div className={movieDetailStyles.castRole}>{c.role || "Cast"}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={movieDetailStyles.noCast}>No cast data available</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {story && (
                    <div className={movieDetailStyles.storyCard}>
                        <h2 className={movieDetailStyles.storyTitle} style={{ fontFamily: "'Cinzel', serif" }}>
                            Story
                        </h2>
                        <p className={movieDetailStyles.storyText}>{story}</p>
                    </div>
                )}

                <div className={movieDetailStyles.crewGrid}>
                    <div className={movieDetailStyles.crewCard}>
                        <div className={movieDetailStyles.crewHeader}>
                            <User className={movieDetailStyles.crewIcon} />
                            <h3 className={movieDetailStyles.crewTitle} style={{ fontFamily: "'Cinzel', serif" }}>
                                Director
                            </h3>
                        </div>
                        <div className={movieDetailStyles.crewContent}>
                            <div className={movieDetailStyles.crewImageGrid}>
                                {directors.length ? (
                                    directors.slice(0, 2).map((d, i) => (
                                        <div key={i} className='flex flex-col items-center'>
                                            {d?.preview ? (
                                                <img
                                                    src={d.preview}
                                                    alt={d.name || `Director ${i + 1}`}
                                                    className={movieDetailStyles.crewImage}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = "https://via.placeholder.com/96?text=D";
                                                    }}
                                                />
                                            ) : (
                                                <div className={movieDetailStyles.fallbackAvatar}>?</div>
                                            )}
                                            <div className={movieDetailStyles.crewName}>{d?.name ?? "N/A"}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='flex flex-col items-center'>
                                        <div className={movieDetailStyles.fallbackAvatar}>?</div>
                                        <div className={movieDetailStyles.crewName}>N/A</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={movieDetailStyles.crewCard}>
                        <div className={movieDetailStyles.crewHeader}>
                            <User className={movieDetailStyles.crewIcon} />
                            <h3 className={movieDetailStyles.crewTitle} style={{ fontFamily: "'Cinzel', serif" }}>
                                Producer
                            </h3>
                        </div>
                        <div className={movieDetailStyles.crewContent}>
                            <div className={movieDetailStyles.crewImageGrid}>
                                {producers.length ? (
                                    producers.slice(0, 2).map((p, i) => (
                                        <div key={i} className='flex flex-col items-center'>
                                            {p?.preview ? (
                                                <img
                                                    src={p.preview}
                                                    alt={p.name || `Producer ${i + 1}`}
                                                    className={movieDetailStyles.crewImage}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = "https://via.placeholder.com/96?text=P";
                                                    }}
                                                />
                                            ) : (
                                                <div className={movieDetailStyles.fallbackAvatar}>?</div>
                                            )}
                                            <div className={movieDetailStyles.crewName}>{p?.name ?? "N/A"}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='flex flex-col items-center'>
                                        <div className={movieDetailStyles.fallbackAvatar}>?</div>
                                        <div className={movieDetailStyles.crewName}>N/A</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <style>{movieDetailCSS}</style>
            </div>
        </div>
    )
}

export default MovieDetailPage