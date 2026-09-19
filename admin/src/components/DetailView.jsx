import React from "react";
import { X, Star, Play, Clock, Calendar } from "lucide-react";
import PersonGrid from "./PersonGrid";
import { styles5 } from "../assets/dummyStyles";
import { displayDuration, formatSlots } from "../utils";

function DetailView({item, onClose}){
    const getTypeGradient = (type) => {
        const gradients = {
            featured: 'from-orange-500 to-red-600',
            normal: 'from-blue-500 to-purple-600',
            comingSoon: 'from-green-500 to-emerald-600',
            latestTrailers: 'from-pink-500 to-rose-600',
        };
        return gradients[type] || 'from-gray-500 to-gray-600';
    };

    const displayAuditorium = item?.auditorium || item?.auditorium === "" ? item.auditorium : "Audi 1";

    return (
        <div className={styles5.detailContainer}>
            <div className={styles5.detailHeaderContainer}>
                <div className='flex-1'>
                    <div className={styles5.detailTypeIndicator}>
                        <div
                        className={`${styles5.detailTypeDot} bg-gradient-to-r ${getTypeGradient(item.type)}`}
                        ></div>
                        <span className={styles5.detailTypeText}>
                            {item.type === 'featured' && 'Featured Movie'}
                            {item.type === 'normal' && 'Now Showing'}
                            {item.type === 'comingSoon' && 'Coming Soon'}
                            {item.type === 'latestTrailers' && 'Latest Trailer'}
                        </span>
                    </div>
                    <h2 className={styles5.detailContentTitle}>
                        {item.movieName || item.title || item.displayTitle}
                    </h2>
                </div>
                <button onClick={onClose} className={styles5.detailCloseButton}>
                    <X size={20} />
                </button>
            </div>

            <div className='space-y-6'>
                {item.type === 'latestTrailers' && (
                    <>
                    {item.thumbnail && (
                        <div className={styles5.detailThumbnail}>
                            <img src={item.thumbnail} alt={item.title} className={styles5.detailThumbnailImage} />
                        </div>
                    )}

                    <div className={styles5.detailGrid}>
                        {item.genres && item.genres.length > 0 && (
                            <div className={styles5.detailGridItem}>
                                <div className={styles5.detailGridLabel}>Genres</div>
                                <div className={styles5.detailGridValue}>
                                    {(item.genres || []).join(", ")}
                                </div>
                            </div>
                        )}
                        {item.year && (
                            <div className={styles5.detailGridItem}>
                                <div className={styles5.detailGridLabel}>Year</div>
                                <div className={styles5.detailGridValue}>{item.year}</div>
                            </div>
                        )}
                        {item.duration && (
                            <div className={styles5.detailGridItem}>
                                <div className={styles5.detailGridLabel}>Duration</div>
                                <div className={styles5.detailGridValue}>{displayDuration(item)}</div>
                            </div>
                        )}
                        {item.rating && (
                            <div className={styles5.detailGridItem}>
                                <div className={styles5.detailGridLabel}>Rating</div>
                                <div className={styles5.detailGridValue}>
                                    <Star size={16} fill='currentColor' />
                                    {item.rating}/10</div>
                            </div>
                        )}

                        <div className={styles5.detailGridItem}>
                                <div className={styles5.detailGridLabel}>Auditorium</div>
                                <div className={styles5.detailGridValue}>{displayAuditorium}</div>
                        </div>
                         </div>

                        <div className={styles5.detailDescription}>
                            <div className={styles5.descriptionLabel}>Description</div>
                            <div className={styles5.descriptionText}>{item.description}</div>
                        </div>

                        {item.trailerUrl && (
                            <a href={item.trailerUrl} target='_blank' rel='noreferrer' className={styles5.watchTrailerButton}>
                                <Play size={20} />
                                Watch Trailer Now
                            </a>
                        )}
                        <PersonGrid list={item.directors} roleLabel='Directors' />
                        <PersonGrid list={item.producers} roleLabel='Producers' />
                        <PersonGrid list={item.singers} roleLabel='Singers' />
                    </>
                )}

                {(item.type === 'normal' || item.type === 'featured') && (
                    <>
                    <div className='grid grid-cols-1 gap-6'>
                        <div className={styles5.detailThumbnail}>
                            <img src={item.poster} alt={item.movieName} className={styles5.detailPoster} />
                        </div>

                        <div className={styles5.detailInfoGrid}>
                            <div className={styles5.detailInfoItem}>
                                <div className={styles5.detailInfoLabel}>Rating</div>
                                <div className={styles5.detailRatingValue}>
                                    <Star size={18} fill='currentColor' />
                                    {item.rating ?? "-"} / 10
                                </div>
                            </div>

                            <div className={styles5.detailInfoItem}>
                                <div className={styles5.detailInfoLabel}>Duration</div>
                                <div className={styles5.detailRatingValue}>
                                    <Clock size={18} />
                                    {displayDuration(item)}
                                </div>
                            </div>

                            <div className={styles5.detailInfoItem}>
                                <div className={styles5.detailInfoLabel}>Auditorium</div>
                                <div className={styles5.detailRatingValue}>
                                   {displayAuditorium}
                                </div>
                            </div>

                            {item.seatPrices && (
                                <>
                                <div className={styles5.detailInfoItem}>
                                    <div className={styles5.detailInfoLabel}>Standard</div>
                                    <div className={styles5.seatPrice}>
                                        ₹{item.seatPrices.standard}
                                    </div>
                                </div>

                                <div className={styles5.detailInfoItem}>
                                    <div className={styles5.detailInfoLabel}>Recliner</div>
                                    <div className={styles5.seatPrice}>
                                        ₹{item.seatPrices.recliner}
                                    </div>
                                </div>
                                </>
                            )}
                        </div>

                        {item.trailerUrl && (
                            <a href={item.trailerUrl} target='_blank' rel='noreferrer'
                            className={`${styles5.cardTrailerButton} justify-center`}
                            >
                                <Play size={18} />
                                Watch Official Trailer
                            </a>
                        )}
                    </div>

                    <div className={styles5.storySection}>
                        <div className={styles5.storyLabel}>
                            <div className={styles5.storyDot}></div>
                            <div className={styles5.descriptionLabel}>Story</div>
                        </div>
                        <div className={styles5.storyText}>{item.story}</div>
                    </div>

                    {(item.slots || []).length > 0 && (
                        <div className={styles5.showtimesSection}>
                            <div className={styles5.showtimesHeader}>
                                <Calendar size={20} className={styles5.showtimesIcon} />
                                <div className={styles5.descriptionLabel}>Showtimes</div>
                            </div>
                            <div className={styles5.showtimesList}>
                                {(item.slots || []).map((s, i) => (
                                    <div key={i} className={styles5.showtimeItem}>
                                        <div className={styles5.showtimeText}>
                                            {formatSlots(s)}
                                        </div>
                                        <div className={styles5.showtimeStatus}>
                                            <div className={styles5.showtimeDot}></div>
                                            <span className={styles5.showtimeStatusText}> AVAILABLE</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <PersonGrid list={item.cast} roleLabel='Cast' />
                    <PersonGrid list={item.directors} roleLabel='Directors' />
                    <PersonGrid list={item.producers} roleLabel='Producers' />
                    </>
                )}

                {item.type === 'comingSoon' && (
                    <div className={styles5.releaseSoonContainer}>
                        <div className={styles5.releaseSoonImage}>
                            <img src={item.poster} alt={item.movieName} className={styles5.detailPoster} />
                        </div>
                        <div className={styles5.releaseSoonText}>Coming Soon</div>
                        <div className={styles5.releaseSoonCategories}>
                            {(item.categories || []).map((cat, i) => (
                                <span key={i} className={styles5.releaseSoonCategory}>
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <div className={styles5.releaseSoonMessage}>
                            Stay tuned for more updates!
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default DetailView;