import React from "react";
import { styles5 } from "../assets/dummyStyles";
import { X, Star, Clock, Play, PlayIcon } from "lucide-react";
import { displayDuration } from "../utils";

function Card({item, onOpen, onDelete}) {
    const getTypeColor = (type) => {
        const colors = {
            featured: 'from-orange-500 to-red-600',
            normal: 'from-blue-500 to-purple-600',
            comingSoon: 'from-green-500 to-emrald-600',
            latestTrailers: 'from-pink-500 to-rose-600',
        };
        return colors[type] || 'from-gray-500 to-gray-600';
    };

    const posterOrThumb = item.poster || item.thumbnail || item.image || item.latestTrailer?.thumbnail || null;

    return (
        <div className={styles5.card} onClick={onOpen}>
            <div className={styles5.cardMedia}>
                <img src={posterOrThumb} alt="" aria-hidden="true"
                className={styles5.cardImageBackdrop}
                />
                <img src={posterOrThumb} alt={item.movieName || item.title || item.directors}
                className={styles5.cardImage}
                />
                <div className={styles5.cardImageOverlay} />

                <button
                onClick={(e) => {e.stopPropagation();
                    if(typeof onDelete === 'function') onDelete();
                }}
                title='Delete'
                aria-label={`Delete ${item.movieName || item.title}`}
                className={styles5.cardDeleteButton}
                >
                <X size={16} />
                </button>
            </div>

            <div className={styles5.cardContent}>
                <div className={styles5.cardHeader}>
                    <div className='flex-1 min-w-0'>
                        <h3 className={styles5.cardTitle}>
                            {item.displayTitle || item.movieName || item.title || 'Untitled'}
                        </h3>
                        <div className={styles5.cardCategories}>
                            {(item.categories || item.genres || []).map((cat, index) => (
                                <span key={index} className={styles5.cardCategory}>
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles5.cardRatingContainer}>
                    {item.type !== 'comingSoon' && (
                        <>
                        {item.rating && (
                            <div className={styles5.cardRating}>
                                <Star
                                className={styles5.cardRatingIcon}
                                size={14}
                                fill='currentColor'
                                />
                                <span className={styles5.cardRatingText}>{item.rating}</span>
                            </div>
                        )}
                        {item.duration && (
                            <div className={styles5.cardDuration}>
                                <Clock className={styles5.cardDurationIcon} size={14} />
                                <span className={styles5.cardDurationText}>{displayDuration(item)}</span>
                            </div>
                        )}
                        </>
                    )}
                </div>

                <p className={styles5.cardDescription}>
                    {(item.story || item.description || item.excerpt || "").slice(0, 150)}
                    {(item.story || item.description || item.excerpt || "").length > 150 && "..."}
                </p>

                <div className={styles5.cardActions}>
                    <button className={styles5.cardViewButton} 
                    onClick={(e) => {e.stopPropagation(); onOpen();}}
                    >
                        <Play size={16} />
                        View Details
                    </button>

                    {item.trailerUrl && item.type !== 'comingSoon' && (
                        <a href={item.trailerUrl} target='_blank' rel='noreferrer' onClick={(e) => e.stopPropagation()}
                        className={styles5.cardTrailerButton}>
                            <PlayIcon className={styles5.cardTrailerIcon} /> Trailer
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;
