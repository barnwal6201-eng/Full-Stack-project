import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import movies from '../assets/dummymdata';

    const ROWS = [
        {id: 'A', type: 'Standard', count: 8},
        {id: 'B', type: 'Standard', count: 8},
        {id: 'C', type: 'Standard', count: 8},
        {id: 'D', type: 'recliner', count: 8},
        {id: 'E', type: 'recliner', count: 8},
    ];

    const TOTAL_SEATS = ROWS.reduce((s,r) => s + r.count, 0);

    const FallbackAvatar = ({className = "w-12 h-12", alt = "avatar"}) =>(
        <div
        className={`${className} bg-gray-700 rounded-full flex items-center justify-center text-sm text-gray-300`}
        aria-hidden='true'
        >
            ?
        </div>
    );

    /**Utility: extract a youtube td from either an id or a full url */
    function extractYouTubeId(urlOrId) {
        if(!urlOrId) return null;
        if(/^[A-Za-z0-9_-]{6,}$/.test(urlOrId)) return urlOrId;

        const re = 
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i;
        const m = urlOrId.match(re);
        return m ? m[1] : null;
    };

    /**Builds embed URL with autoplay and minimal related-video noise */
    const getEmbedUrl = (id) => 
        id 
    ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : null;

    /**
     * Helpers to format dates/times in a target timezone using Intl.formatToParts.
     */
    const getParts = (dateLike, timeZone) => {
       const dt = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
       const parts = new Intl.DateTimeFormat("en", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
       }).formatToParts(dt);

       const map = {};
       for(const p of parts) {
        if(p.type !== "literal") map[p.type] = p.value;
       }
       map.dayPeriod = map.dayPeriod || map.ampm || map.AMPM || map.ampm;
       return map;
    };

    const pad = (n) => String(n). padStart(2, "0");

    /**Returns date key 'YYYY-MM-DD' for the given date/ISO in given timezone */
    const formatDateKey = (dateLike, timeZone = "Asia/Kolkata") => {
        const p = getParts(dateLike, timeZone);
        return `${p.year}-${p.month}-${p.day}`;
    };

    /**Returns a human time string like  "1:30 PM"(12-hour) for the given ISO in timezone */
    const formatTimeInTZ = (dateLike, timeZone = "Asia/Kolkata") => {
        const p = getParts(dateLike, timeZone);
        const hour = String(Number(p.hour));
        return `${hour}:${p.minute} ${String(
            p.dayPeriod ?? p.ampm ?? ""
        ).toUpperCase()}`;
    };


const MovieDetailPage = () => {

    const {id} = useParams();
    const movieId = Number(id);
    const movie = useMemo(() => movies.find((m) => m.id === movieId), [movieId]);
    const navigate = useNavigate();

    //Trailer-related state
    const [showTrailer, setShowTrailer] = useState(false);
    const [selectedTrailerId, setSelectedTrailer] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);


  return (
   
    <div>
      Movies
    </div>
  )
}

export default MovieDetailPage
