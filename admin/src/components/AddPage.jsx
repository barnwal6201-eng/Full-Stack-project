import React, { useEffect, useReducer, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { addMoviePageCustomStyles, addMoviePageStyles } from '../assets/dummyStyles'
import { Film, X, Image as ImageIcon, Users, Clock, Star, Play, Plus } from 'lucide-react'
import Uploader from './Uploader'
import NamedUploader from './NameUploader'
import { initialState, addPageReducer } from './addPageReducer'

const API_HOST = import.meta.env.VITE_API_BASE_URL;

const AddPage = () => {
    const [state, dispatch] = useReducer(addPageReducer, initialState);
    const {
        movieName, categories, poster, posterPreview, trailerUrl, videoUrl,
        rating, duration, durationHours, durationMinutes, slots,
        castImages, directorImages, producerImages, story, movieType,
        standardSeatPrice, reclinerSeatPrice,
        ltDurationHours, ltDurationMinutes, ltYear, ltDescription,
        ltThumbnail, ltThumbnailPreview, ltVideoUrl,
        ltDirectorImages, ltProducerImages, ltSingerImages,
        auditorium, customerAuditorium, isUploading,
    } = state;

    const fileInputRef = useRef();
    const availableAuditoriums = ["Audi 1", "Audi 2", "Audi 3"];
    const availableCategories = ["Action", "Horror", "Comedy", "Adventure"];

    useEffect(() => {
        const total = (Number(durationHours) || 0) * 60 + (Number(durationMinutes) || 0);
        dispatch({ type: 'SET_FIELD', field: 'duration', value: total });
    }, [durationHours, durationMinutes]);

    function toggleCategory(cat) {
        dispatch({ type: 'TOGGLE_CATEGORY', category: cat });
    }

    const set = (field) => (value) => dispatch({ type: 'SET_FIELD', field, value });

    const handlePosterChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        dispatch({ type: 'SET_FIELD', field: 'poster', value: file });
        const reader = new FileReader();
        reader.onload = (ev) =>
            dispatch({ type: 'SET_FIELD', field: 'posterPreview', value: ev.target.result });
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const handleLtThumbnailChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        dispatch({ type: 'SET_FIELD', field: 'ltThumbnail', value: file });
        const reader = new FileReader();
        reader.onload = (ev) =>
            dispatch({ type: 'SET_FIELD', field: 'ltThumbnailPreview', value: ev.target.result });
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const readFilesToPreviewsWithMeta = (files, field, metaType = null) => {
        const arr = Array.from(files);
        const readers = arr.map((file) => {
            return new Promise((res) => {
                const r = new FileReader();
                r.onload = (e) => res({
                    file,
                    preview: e.target.result,
                    ...(metaType === 'name' ? { name: "" } : {}),
                    ...(metaType === 'nameRole' ? { name: "", role: "" } : {}),
                });
                r.readAsDataURL(file);
            });
        });
        Promise.all(readers).then((items) => {
            dispatch({ type: 'ADD_ITEMS', field, items });
        });
    };

    const handleMultipleFiles = (e, field, metaType = null) => {
        if (!e.target.files) return;
        readFilesToPreviewsWithMeta(e.target.files, field, metaType);
        e.target.value = null;
    };

    const readFilesToNamedPreviews = (files, field) => {
        const arr = Array.from(files);
        const readers = arr.map((file) => {
            return new Promise((res) => {
                const r = new FileReader();
                r.onload = (e) => res({ file, preview: e.target.result, name: "" });
                r.readAsDataURL(file);
            });
        });
        Promise.all(readers).then((items) => {
            dispatch({ type: 'ADD_ITEMS', field, items });
        });
    };

    const handleMultipleNamedFiles = (e, field) => {
        if (!e.target.files) return;
        readFilesToNamedPreviews(e.target.files, field);
        e.target.value = null;
    };

    const removePreview = (index, field) => {
        dispatch({ type: 'REMOVE_ITEM', field, index });
    };

    const updateNamedItemName = (index, field, value) => {
        dispatch({ type: 'UPDATE_ITEM', field, index, key: 'name', value });
    };

    const updateMetaField = (index, field, key, value) => {
        dispatch({ type: 'UPDATE_ITEM', field, index, key, value });
    };

    function addSlot() {
        dispatch({ type: 'ADD_SLOTS' });
    }
    function removeSlot(id) {
        dispatch({ type: 'REMOVE_SLOTS', id });
    }
    function updateSlot(id, field, value) {
        dispatch({ type: 'UPDATE_SLOTS', id, field, value });
    }

    function resetForm() {
        dispatch({ type: 'RESET' });
    }

    function validate() {
        if (movieType === 'latestTrailers') {
            if (!movieName.trim()) return 'Please enter title for latest trailer.';
            if (!categories.length) return 'Please choose at least one genre for latest trailer.';
            if (!ltThumbnail) return 'Please select a thumbnail image for latest trailer.';
            if (!ltVideoUrl.trim()) return 'Please provide the video URL for latest trailer.';
            if (!ltDescription.trim()) return 'Please add a description for latest trailer.';
            if (!ltYear) return 'Please enter year for latest trailer.';
            const badDirector = ltDirectorImages.find((d) => d && (!d.name || !d.name.trim()));
            if (badDirector) return 'Please add a name for every director image.';
            const badProducer = ltProducerImages.find((d) => d && (!d.name || !d.name.trim()));
            if (badProducer) return 'Please add a name for every producer image.';
            const badSinger = ltSingerImages.find((d) => d && (!d.name || !d.name.trim()));
            if (badSinger) return 'Please add a name for every singer image.';
            return null;
        }

        if (!movieName.trim()) return 'Please enter movie name.';
        if (!poster) return 'Please add a poster image';

        if (movieType !== 'comingSoon') {
            if (!categories.length) return 'Please choose at least one category.';
        }

        if (movieType === 'normal' || movieType === 'featured') {
            const totalDuration = (Number(durationHours) || 0) * 60 + (Number(durationMinutes) || 0);
            if (totalDuration <= 0) return 'Please enter a valid movie duration.';

            if (Number.isNaN(Number(standardSeatPrice)) || Number(standardSeatPrice) <= 0)
                return 'Please enter a valid standard seat price.';
            if (Number.isNaN(Number(reclinerSeatPrice)) || Number(reclinerSeatPrice) <= 0)
                return 'Please enter a valid recliner seat price.';

            const finalAuditorium =
                auditorium === 'other' ? (customerAuditorium || "").trim() : "Audi 1";
            if (!finalAuditorium) return 'Please select auditorium.';

            const badCast = castImages.find((c) => {
                if (!c) return false;
                return !c.name || !c.name.trim() || !c.role || !c.role.trim();
            });
            if (badCast) return 'Please add name and role for every cast image.';
            const badDirector = directorImages.find((d) => d && (!d.name || !d.name.trim()));
            if (badDirector) return 'Please add name for every director image.';
            const badProducer = producerImages.find((p) => p && (!p.name || !p.name.trim()));
            if (badProducer) return 'Please add name for every producer image.';
        }
        return null;
    }

    function appendFilesToForm(form, fieldName, items) {
        if (!items || items.length === 0) return;
        for (let i = 0; i < items.length; i++) {
            const it = items[i];
            if (it && it.file) form.append(fieldName, it.file);
        }
    }

    async function hanldeSubmit(e) {
        e.preventDefault();
        const error = validate();
        if (error) return toast.error(error);

        dispatch({ type: 'SET_FIELD', field: 'isUploading', value: true });
        const form = new FormData();
        form.append('type', movieType);

        if (movieType === 'latestTrailers') {
            const latestTrailerObj = {
                title: movieName,
                genres: categories,
                duration: {
                    hours: Number(ltDurationHours) || 0,
                    minutes: Number(ltDurationMinutes) || 0,
                },
                year: Number(ltYear) || new Date().getFullYear(),
                rating: Number(rating) || 0,
                description: ltDescription,
                thumbnail: ltThumbnail,
                videoId: ltVideoUrl,
                directors: ltDirectorImages.map((d) => ({ name: d.name || "", file: d.file ? d.file.name : null })),
                producers: ltProducerImages.map((p) => ({ name: p.name || "", file: p.file ? p.file.name : null })),
                singers: ltSingerImages.map((s) => ({ name: s.name || "", file: s.file ? s.file.name : null })),
            };

            form.append('movieName', movieName);
            form.append('latestTrailers', JSON.stringify(latestTrailerObj));
            if (ltThumbnail) form.append('ltThumbnail', ltThumbnail);

            appendFilesToForm(form, 'ltDirectorFiles', ltDirectorImages);
            appendFilesToForm(form, 'ltProducersFiles', ltProducerImages);
            appendFilesToForm(form, 'ltSingerFiles', ltSingerImages);
        } else {
            form.append('movieName', movieName);
            form.append('categories', JSON.stringify(categories));
            if (poster) form.append('poster', poster);
            form.append('trailerUrl', trailerUrl || "");
            form.append('videoUrl', videoUrl || "");
            form.append('rating', String(rating));
            form.append('duration', String(duration));
            form.append('slots', JSON.stringify(slots));
            form.append('seatPrices', JSON.stringify({
                standard: Number(standardSeatPrice),
                recliner: Number(reclinerSeatPrice),
            }));

            const finalAuditorium = auditorium === 'other'
                ? customerAuditorium.trim() || 'Audi 1'
                : auditorium;
            form.append('auditorium', finalAuditorium);

            form.append('cast', JSON.stringify(
                castImages.map((c) => ({ name: c.name || '', role: c.role || "", file: c.file ? c.file.name : null }))
            ));
            form.append('directors', JSON.stringify(
                directorImages.map((d) => ({ name: d.name || "", file: d.file ? d.file.name : null }))
            ));
            form.append('producers', JSON.stringify(
                producerImages.map((p) => ({ name: p.name || "", file: p.file ? p.file.name : null }))
            ));
            form.append('story', story || '');

            appendFilesToForm(form, 'castFiles', castImages);
            appendFilesToForm(form, 'directorFiles', directorImages);
            appendFilesToForm(form, 'producersFiles', producerImages);
        }

        try {
            const resp = await axios.post(`${API_HOST}/api/movies`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (resp?.data?.success) {
                toast.success('Movie added successfully!');
                resetForm();
            } else {
                toast.error(resp?.data?.message || 'Unexpected error from server');
            }
        } catch (error) {
            console.error('submit error: ', error);
            const msg = error?.response?.data?.message || error.message || 'Failed to upload.';
            toast.error(msg);
        } finally {
            dispatch({ type: 'SET_FIELD', field: 'isUploading', value: false });
        }
    }

    const showFullFields = movieType === 'normal' || movieType === 'featured';
    const isComingSoon = movieType === 'comingSoon';
    const isLatestTrailer = movieType === 'latestTrailers';

    return (
        <div className={addMoviePageStyles.pageContainer}>
            <style>{addMoviePageCustomStyles}</style>
            <div className={addMoviePageStyles.mainContainer}>
                <header className={addMoviePageStyles.header}>
                    <h1 className={`${addMoviePageStyles.title} font-cinzel`}>
                        <Film className={addMoviePageStyles.titleIcon} /> Add Movie
                    </h1>
                </header>

                <form onSubmit={hanldeSubmit} className={addMoviePageStyles.form}>

                    <div className={addMoviePageStyles.radioContainer}>
                        {['normal', 'featured', 'comingSoon', 'latestTrailers'].map((t) => (
                            <label key={t} className={addMoviePageStyles.radioLabel}>
                                <input type="radio"
                                    name='movieType'
                                    checked={movieType === t}
                                    onChange={() => set('movieType')(t)}
                                    className={addMoviePageStyles.radioInput}
                                />
                                <span>
                                    {t === 'normal' ? 'Normal'
                                        : t === 'featured' ? 'Featured'
                                        : t === 'comingSoon' ? 'Coming Soon'
                                        : 'Latest Trailers'}
                                </span>
                            </label>
                        ))}
                    </div>

                    {!isLatestTrailer && (
                        <>
                            <div className={addMoviePageStyles.section}>
                                <div className={addMoviePageStyles.gridCols2}>

                                    <div className={addMoviePageStyles.inputContainer}>
                                        <label className={addMoviePageStyles.label}>Poster Image</label>
                                        {posterPreview ? (
                                            <div className={addMoviePageStyles.previewContainer}>
                                                <img src={posterPreview} alt="poster preview" className={addMoviePageStyles.previewImage} />
                                                <button
                                                    type="button"
                                                    onClick={() => dispatch({ type: 'SET_FIELDS', fields: { poster: null, posterPreview: null } })}
                                                    className={addMoviePageStyles.removeButton}
                                                >
                                                    <X className={addMoviePageStyles.removeIcon} />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className={addMoviePageStyles.uploadContainer}>
                                                <div className={addMoviePageStyles.uploadContent}>
                                                    <div className={addMoviePageStyles.uploadIconContainer}>
                                                        <ImageIcon className={addMoviePageStyles.iconMd} />
                                                    </div>
                                                    <span className={addMoviePageStyles.uploadText}>Click to upload poster</span>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePosterChange}
                                                    className={addMoviePageStyles.uploadInput}
                                                />
                                            </label>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className={addMoviePageStyles.inputContainer}>
                                            <label className={addMoviePageStyles.label}>Movie Name</label>
                                            <input
                                                value={movieName}
                                                onChange={(e) => set('movieName')(e.target.value)}
                                                placeholder="Enter movie name"
                                                className={addMoviePageStyles.input}
                                            />
                                        </div>

                                        {!isComingSoon && (
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Categories</label>
                                                <div className={addMoviePageStyles.categoryContainer}>
                                                    {availableCategories.map((cat) => (
                                                        <button
                                                            type="button"
                                                            key={cat}
                                                            onClick={() => toggleCategory(cat)}
                                                            className={`${addMoviePageStyles.categoryButton} ${categories.includes(cat)
                                                                ? addMoviePageStyles.categoryButtonSelected
                                                                : addMoviePageStyles.categoryButtonNormal
                                                                }`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {showFullFields && (
                                            <div className={addMoviePageStyles.gridCols3}>
                                                <div className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Standard Seat Price (required)</label>
                                                    <input type="number" value={standardSeatPrice}
                                                        onChange={(e) => set('standardSeatPrice')(e.target.value)}
                                                        className={addMoviePageStyles.input}
                                                    />
                                                </div>
                                                <div className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Recliner Seat Price (required)</label>
                                                    <input type="number" value={reclinerSeatPrice} onChange={(e) => set('reclinerSeatPrice')(e.target.value)}
                                                        className={addMoviePageStyles.input}
                                                    />
                                                </div>
                                                <div className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Auditorium</label>
                                                    <select value={auditorium}
                                                        onChange={(e) => set('auditorium')(e.target.value)}
                                                        className={addMoviePageStyles.select}
                                                    >
                                                        {availableAuditoriums.map((a) => (
                                                            <option key={a} value={a}>{a}</option>
                                                        ))}
                                                        <option value="other">Other</option>
                                                    </select>
                                                    {auditorium === 'other' && (
                                                        <input value={customerAuditorium}
                                                            onChange={(e) => set('customerAuditorium')(e.target.value)}
                                                            placeholder="Enter auditorium name"
                                                            className={`${addMoviePageStyles.input} mt-2`}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className={addMoviePageStyles.gridCols2}>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Trailer URL</label>
                                                <div className="relative flex items-center">
                                                    <Play className="absolute left-3 size-4 opacity-70 pointer-events-none" />
                                                    <input
                                                        value={trailerUrl}
                                                        onChange={(e) => set('trailerUrl')(e.target.value)}
                                                        placeholder="https://"
                                                        className={`${addMoviePageStyles.input} pl-9`}
                                                    />
                                                </div>
                                            </div>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Rating</label>
                                                <div className="relative flex items-center">
                                                    <Star className="absolute left-3 size-4 opacity-70 pointer-events-none" />
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        max="10"
                                                        value={rating}
                                                        onChange={(e) => set('rating')(e.target.value)}
                                                        className={`${addMoviePageStyles.input} pl-9`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={addMoviePageStyles.gridCols2}>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Duration (hours)</label>
                                                <div className="relative flex items-center">
                                                    <Clock className="absolute left-3 size-4 opacity-70 pointer-events-none" />
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={durationHours}
                                                        onChange={(e) => {
                                                        set('durationHours')(e.target.value); 
                                                         }}
                                                        onBlur={(e) => {
                                                            const val = Math.max(0, Number(e.target.value) || 2);
                                                            set('durationHours')(val);
                                                        }}
                                                        className={`${addMoviePageStyles.input} pl-9`}
                                                    />
                                                </div>
                                            </div>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Duration (minutes)</label>
                                                <div className="relative flex items-center">
                                                    <Clock className="absolute left-3 size-4 opacity-70 pointer-events-none" />
                                                    <input
                                                        type="number"
                                                        max="59"
                                                        value={durationMinutes}
                                                        onChange={(e) => {
                                                        set('durationMinutes')(e.target.value); 
                                                         }}
                                                        onBlur={(e) => {
                                                        const val = Math.min(59, Math.max(0, Number(e.target.value) || 0));
                                                        set('durationMinutes')(val); // convert + clamp only when they're done editing
                                                         }}
                                                        className={`${addMoviePageStyles.input} pl-9`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!isComingSoon && (
                                <div className={addMoviePageStyles.section}>
                                    <div className={addMoviePageStyles.slotsHeader}>
                                        <h3 className={addMoviePageStyles.sectionTitle}>Movie Slots</h3>
                                        <button type="button" onClick={addSlot} className={addMoviePageStyles.addSlotButton}>
                                            <Plus className={addMoviePageStyles.addSlotIcon} /> Add Slot
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {slots.map((slot) => (
                                            <div key={slot.id} className={addMoviePageStyles.slotItem}>
                                                <div className={addMoviePageStyles.slotGrid}>
                                                    <input
                                                        type="date"
                                                        value={slot.date}
                                                        onChange={(e) => updateSlot(slot.id, 'date', e.target.value)}
                                                        className={addMoviePageStyles.slotInput}
                                                    />
                                                    <input
                                                        type="time"
                                                        value={slot.time}
                                                        onChange={(e) => updateSlot(slot.id, 'time', e.target.value)}
                                                        className={addMoviePageStyles.slotInput}
                                                    />
                                                    <select
                                                        value={slot.ampm}
                                                        onChange={(e) => updateSlot(slot.id, 'ampm', e.target.value)}
                                                        className={addMoviePageStyles.slotInput}
                                                    >
                                                        <option value="AM">AM</option>
                                                        <option value="PM">PM</option>
                                                    </select>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSlot(slot.id)}
                                                    className={addMoviePageStyles.slotRemoveButton}
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {showFullFields && (
                                <div className={addMoviePageStyles.gridCols3}>
                                    <Uploader
                                        title="Cast Photos"
                                        icon={<Users className="size-4" />}
                                        items={castImages}
                                        onFiles={(e) => handleMultipleFiles(e, 'castImages', 'nameRole')}
                                        remove={(idx) => removePreview(idx, 'castImages')}
                                        updateMeta={(idx, field, value) => updateMetaField(idx, 'castImages', field, value)}
                                    />
                                    <Uploader
                                        title="Director Photos"
                                        icon={<ImageIcon className="size-4" />}
                                        items={directorImages}
                                        onFiles={(e) => handleMultipleFiles(e, 'directorImages', 'name')}
                                        remove={(idx) => removePreview(idx, 'directorImages')}
                                        updateMeta={(idx, field, value) => updateMetaField(idx, 'directorImages', field, value)}
                                    />
                                    <Uploader
                                        title="Producer Photos"
                                        icon={<ImageIcon className="size-4" />}
                                        items={producerImages}
                                        onFiles={(e) => handleMultipleFiles(e, 'producerImages', 'name')}
                                        remove={(idx) => removePreview(idx, 'producerImages')}
                                        updateMeta={(idx, field, value) => updateMetaField(idx, 'producerImages', field, value)}
                                    />
                                </div>
                            )}

                            {!isComingSoon && (
                                <div className={addMoviePageStyles.section}>
                                    <label className={addMoviePageStyles.label}>Story</label>
                                    <textarea
                                        value={story}
                                        onChange={(e) => set('story')(e.target.value)}
                                        rows={5}
                                        placeholder="Write the movie story here..."
                                        className={addMoviePageStyles.textarea}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {isLatestTrailer && (
                        <>
                            <div className={addMoviePageStyles.section}>
                                <div className={addMoviePageStyles.gridCols2}>
                                    <div className={addMoviePageStyles.inputContainer}>
                                        <label className={addMoviePageStyles.label}>Thumbnail Image</label>
                                        {ltThumbnailPreview ? (
                                            <div className={addMoviePageStyles.previewContainer}>
                                                <img src={ltThumbnailPreview} alt="thumbnail preview" className={addMoviePageStyles.previewThumbnail} />
                                                <button
                                                    type="button"
                                                    onClick={() => dispatch({ type: 'SET_FIELDS', fields: { ltThumbnail: null, ltThumbnailPreview: null } })}
                                                    className={addMoviePageStyles.removeButton}
                                                >
                                                    <X className={addMoviePageStyles.removeIcon} />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className={addMoviePageStyles.uploadContainer}>
                                                <div className={addMoviePageStyles.uploadContent}>
                                                    <div className={addMoviePageStyles.uploadIconContainer}>
                                                        <ImageIcon className={addMoviePageStyles.iconMd} />
                                                    </div>
                                                    <span className={addMoviePageStyles.uploadText}>Click to upload thumbnail</span>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLtThumbnailChange}
                                                    className={addMoviePageStyles.uploadInput}
                                                />
                                            </label>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className={addMoviePageStyles.inputContainer}>
                                            <label className={addMoviePageStyles.label}>Title</label>
                                            <input
                                                value={movieName}
                                                onChange={(e) => set('movieName')(e.target.value)}
                                                placeholder="Enter title"
                                                className={addMoviePageStyles.input}
                                            />
                                        </div>

                                        <div className={addMoviePageStyles.inputContainer}>
                                            <label className={addMoviePageStyles.label}>Genres</label>
                                            <div className={addMoviePageStyles.categoryContainer}>
                                                {availableCategories.map((cat) => (
                                                    <button
                                                        type="button"
                                                        key={cat}
                                                        onClick={() => toggleCategory(cat)}
                                                        className={`${addMoviePageStyles.categoryButton} ${categories.includes(cat)
                                                            ? addMoviePageStyles.categoryButtonSelected
                                                            : addMoviePageStyles.categoryButtonNormal
                                                            }`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={addMoviePageStyles.gridCols3}>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Duration (hours)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={ltDurationHours}
                                                    onChange={(e) => set('ltDurationHours')(e.target.value)}
                                                    className={addMoviePageStyles.input}
                                                />
                                            </div>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Duration (minutes)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="59"
                                                    value={ltDurationMinutes}
                                                    onChange={(e) => {
                                                        const val = Math.min(59, Math.max(0, Number(e.target.value) || 0));
                                                        set('ltDurationMinutes')(val);
                                                    }}
                                                    className={addMoviePageStyles.input}
                                                />
                                            </div>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Year</label>
                                                <input
                                                    type="number"
                                                    value={ltYear}
                                                    onChange={(e) => set('ltYear')(e.target.value)}
                                                    className={addMoviePageStyles.input}
                                                />
                                            </div>
                                        </div>

                                        <div className={addMoviePageStyles.gridCols2}>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Video URL</label>
                                                <input
                                                    value={ltVideoUrl}
                                                    onChange={(e) => set('ltVideoUrl')(e.target.value)}
                                                    placeholder="https://"
                                                    className={addMoviePageStyles.input}
                                                />
                                            </div>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Rating</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="10"
                                                    value={rating}
                                                    onChange={(e) => set('rating')(e.target.value)}
                                                    className={addMoviePageStyles.input}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={addMoviePageStyles.section}>
                                <label className={addMoviePageStyles.label}>Description</label>
                                <textarea
                                    value={ltDescription}
                                    onChange={(e) => set('ltDescription')(e.target.value)}
                                    rows={4}
                                    placeholder="Write a short description..."
                                    className={addMoviePageStyles.textarea}
                                />
                            </div>

                            <div className={addMoviePageStyles.gridCols3}>
                                <NamedUploader
                                    title="Director Photos"
                                    icon={<ImageIcon className="size-4" />}
                                    items={ltDirectorImages}
                                    onFiles={(e) => handleMultipleNamedFiles(e, 'ltDirectorImages')}
                                    remove={(idx) => removePreview(idx, 'ltDirectorImages')}
                                    updatName={(idx, value) => updateNamedItemName(idx, 'ltDirectorImages', value)}
                                />
                                <NamedUploader
                                    title="Producer Photos"
                                    icon={<ImageIcon className="size-4" />}
                                    items={ltProducerImages}
                                    onFiles={(e) => handleMultipleNamedFiles(e, 'ltProducerImages')}
                                    remove={(idx) => removePreview(idx, 'ltProducerImages')}
                                    updatName={(idx, value) => updateNamedItemName(idx, 'ltProducerImages', value)}
                                />
                                <NamedUploader
                                    title="Singer Photos"
                                    icon={<Users className="size-4" />}
                                    items={ltSingerImages}
                                    onFiles={(e) => handleMultipleNamedFiles(e, 'ltSingerImages')}
                                    remove={(idx) => removePreview(idx, 'ltSingerImages')}
                                    updatName={(idx, value) => updateNamedItemName(idx, 'ltSingerImages', value)}
                                />
                            </div>
                        </>
                    )}
                    <div className={addMoviePageStyles.actionsContainer}>
                        <button type="button" onClick={resetForm} className={addMoviePageStyles.resetButton}>
                            Reset
                        </button>
                        <button type="submit" disabled={isUploading} className={addMoviePageStyles.submitButton}>
                            {isUploading ? 'Uploading...' : 'Add Movie'}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer
            position='top-right'
            theme='dark'
            toastClassName='admin-toast'
            progressClassName='admin-toast-progress'
            />
        </div>
    )
};
export default AddPage
