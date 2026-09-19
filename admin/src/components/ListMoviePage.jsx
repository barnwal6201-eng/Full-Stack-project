import React, { useEffect, useMemo, useRef, useState } from 'react'
import { styles5, customStyles } from '../assets/dummyStyles'
import axios from 'axios'
import { Calendar, Clock,  Film, Play as PlayIcon, Search, Star, Ticket, X } from 'lucide-react';
import { getImageUrl, displayDuration, formatSlot } from '../utils';
import Card from './Card';
import DetailView from './DetailView';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const ListMoviePage = () => {

    const [movies, setMovies] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchRef = useRef();

    useEffect(() => {
        clearTimeout(searchRef.current);
        searchRef.current = setTimeout(() => {
            fetchMovies();
        }, 300);
        return () => clearTimeout(searchRef.current);
    }, [filterType, search]);

    useEffect(() => {
        fetchMovies();
    },[]);

    async function fetchMovies() {
        try {
            setLoading(true);
            setError(null);
            const params = {};

            if(filterType && filterType !== 'all' && filterType !== 'latestTrailers'){
                params.type = filterType;
            }
            if(filterType === 'latestTrailers'){
                params.latestTrailers = true;
                params.type = 'latestTrailers';
            }
            if(search && search.trim()) params.search = search.trim();
            const res = await axios.get(`${API_BASE}/api/movies`, {params});

            let items = [];
            if(res?.data?.success) {
                items = res.data.items || [];
            }else if(Array.isArray(res?.data)){
                items = res.data;
            }else{
                items = [];
            }

            const normalized = items.map(normalizeMovie);
            setMovies(normalized);
            console.log('Movies:', normalized);

        } catch (err) {
            console.error('FetchMovies Error:', err);
            setError(
                err?.response?.data?.message || err.message || 'Failed to load monies'
            );
        }finally{
            setLoading(false);
        }
    };

    function normalizeMovie(item) {
        const obj = {...item};

        obj.poster = getImageUrl(item.poster) || (item.poster ? item.poster : null);

        const normalizeTopPeople = (arr = []) => 
        (arr || []).map((p) => ({
            ...(p || {}),
            preview: p?.preview || getImageUrl(p?.file) || p?.file || p?.image || p?.url || null,
        }));

        obj.cast = normalizeTopPeople(item.cast);
        obj.directors = normalizeTopPeople(item.directors);
        obj.producers = normalizeTopPeople(item.producers);

        if(
            item.latestTrailer && 
            (item.type === 'latestTrailers' || item.latestTrailer.title || item.latestTrailer.thumbnail || item.latestTrailer.videoId)
        ){
            const lt = item.latestTrailer || {};

            obj.title = lt.title || item.title || item.movieName || null;
            obj.thumbnail = getImageUrl(lt.thumbnail) || getImageUrl(item.thumbnail) || lt.thumbnail || null;
            obj.genres = lt.genres || item.genres || [];
            obj.year = lt.year || item.year || null;
            obj.rating = lt.rating ?? item.rating ?? null;
            obj.duration = lt.duration || item.duration || null;
            obj.description = lt.description || item.description || item.story || null;

            const normalizeLatestPeople = (arr = []) => 
            (arr || []).map((p) => ({
              ...(p || {}),
              preview: p?.preview || getImageUrl(p?.file) || p?.file || p?.image || p?.url || null,
            }));

            obj.directors = normalizeLatestPeople(lt.directors || item.latestTrailer?.directors || item.directors || []);
            obj.producers = normalizeLatestPeople(lt.producers || item.latestTrailer?.producers || item.producers || []);
            obj.singers = normalizeLatestPeople(lt.singers || item.latestTrailer.singers || []);

        } else{
            //for non latest trailer
            obj.thumbnail = getImageUrl(item.thumbnail) || obj.poster || null;

        }
            obj.type = obj.type || (obj.title && !obj.movieName ? 'latestTrailers' : "normal");
            obj.displayTitle = obj.movieName || obj.title || obj.movieName || 'Untitled';
            return obj;
    }

    const types = useMemo(
        () => [
            {key: "all", label: "All", icon: Film },
            {key: "normal", label: "Normal", icon: Ticket },
            {key: "featured", label: "Featured", icon: Star },
            {key: "comingSoon", label: "Coming Soon", icon: Calendar },
            {key: "latestTrailers", label: "Trailers", icon: PlayIcon },
        ],
        []
    );


    const filtered = useMemo(() => {
        /**
         * already requested filtered data from backend, but keep a guard to
         * exclude any cinenews entries if present in tne returned list
         */
        return(movies || []).filter((item) => item.type !== 'cinenews');
    }, [movies]);

    async function handleDelete(id){
        const item = movies.find((m) => m._id === id || m.id === id);
        if(!item) return;

        const title = item.movieName || item.title || "this item";
        const ok = window.confirm(
            `Delete"${title}" ? This action cannot be undone.`
        );
        if(!ok) return;

        try {
            const targetId = item._id || item.id || id;
            await axios.delete(`${API_BASE}/api/movies/${targetId}`);
            setMovies((prev) => prev.filter((m) => (m._id || m.id) !== targetId));
            if(selected && (selected._id || selected.id) === targetId)
                setSelected(null);
        } catch (err) {
            console.error('Delete Movie Error:', err);
            alert('Failed to delete the movie.')
        }
    }

  return (
    <div className={styles5.listMoviesContainer}>
      <style>{customStyles}</style>

      <div className={styles5.maxWidth7xl}>
        <header className={styles5.listMoviesHeader}>
            <div className='text-left'>
                <h1 className={styles5.listMoviesTitle}>Movies</h1>
                <div className={styles5.listMoviesSubtitle}>
                    {loading ? "Loading..." : `${filtered.length}items`}
                </div>
            </div>

            <div className={styles5.searchContainer}>
                <div className={styles5.searchBox}>
                    <input value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search movies, stories, trailers..'
                    className={styles5.searchInput}
                    />
                    <div className={styles5.searchIcon}>
                        <Search size={28} />
                    </div>
                </div>
            </div>

            <div className={styles5.filterContainer}>
                {types.map((t) => {
                    const IconComponent = t.icon;
                    return (
                        <button 
                        key={t.key}
                        onClick={() => {
                            setFilterType(t.key);
                        }}
                        className={`${styles5.filterButton} ${
                            filterType === t.key ? styles5.filterButtonActive : styles5.filterButtonInactive
                        }`}
                        >
                            <IconComponent size={16} />
                            {t.label}
                        </button>
                    );
                })}
            </div>
        </header>

        <div className={styles5.mainGrid}>
            <div className={styles5.leftColumn}>
                <div className={styles5.cardsGrid}>
                    {error && (
                        <div className={styles5.errorContainer}>
                            <div className={styles5.errorMessage}>Erroe</div>
                            <div className='text-sm mt-2'>{error}</div>
                            <div className='mt-3'>
                                <button
                                onClick={fetchMovies}
                                className={styles5.errorRetryButton}
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    )}

                    {!error && filtered.length === 0 && !loading && (
                        <div className={styles5.emptyState}>
                            <div className={styles5.emptyStateText}>No items found</div>
                            <div className={styles5.emptyStateSubtext}>
                                Try adjusting your search or filters
                            </div>
                        </div>
                    )}

                    {filtered.map((item) => (
                        <Card 
                        key= {item._id || item.id || item.title || item.displayTitle}
                        item={item}
                        onOpen={() => setSelected(item)}
                        onDelete={() => handleDelete(item._id || item.id)}
                        />
                    ))}

                    {loading && (
                        <div className={styles5.loadingState}>
                            <div className={styles5.loadingText}>Loading movies...</div>
                        </div>
                    )}
                </div>
            </div>

            <aside className={styles5.rightColumn}>
                <div className={styles5.detailSidebar}>
                    <div className={styles5.detailHeader}>
                        <h2 className={styles5.detailTitle}>Details</h2>
                        <div className={styles5.detailLiveIndicator}>
                            <div className={styles5.detailLiveDot}></div>
                            <span className={styles5.detailLiveText}>Live</span>
                        </div>
                    </div>

                    {selected ? (
                        <DetailView item={selected} onClose={() => setSelected(null)} />
                    ): (
                        <div className={styles5.detailEmptyState}>
                            <div className='flex items-center justify-center mb-3 w-full'>
                                <div className={styles5.detailEmptyIcon}>
                                <Film size={60} className='text-red-600' />
                            </div>
                        </div>

                        <div className={styles5.detailEmptyText}>
                            Click "View Details" on card
                        </div>
                        <div className={styles5.detailEmptySubtext}>
                            Details will appear here after you click.
                        </div>
                        </div>                  
                    )}
                </div>
            </aside>
        </div>
      </div>
    </div>
  )
}
export default ListMoviePage
