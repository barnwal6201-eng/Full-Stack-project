import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { addMoviePageCustomStyles, addMoviePageStyles } from '../assets/dummyStyles'
import { Film, X, Image as ImageIcon, Users, Clock, Star, Play, Plus } from 'lucide-react'


const API_HOST = import.meta.env.VITE_API_BASE_URL;

const AddPage = () => {

    const [movieName, setMovieName] = useState("");
    const [categories, setCategories] = useState([]);
    const [poster, setPoster] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [rating, setRating] = useState(7.5);
    const [duration, setDuration] = useState(120);
    const [slots, setSlots] = useState([
        { id: Date.now(), date: "", time: "", ampm: "AM" },
    ]);
    const [castImages, setCastImages] = useState([]);
    const [directorImages, setDirectorImages] = useState([]);
    const [producerImages, setProducerImages] = useState([]);
    const [story, setStory] = useState("");
    const [movieType, setMovieType] = useState("normal");
    const [standardSeatPrice, setStandardSeaterPrice] = useState(0);
    const [reclinerSeatPrice, setReclinerSeaterPrice] = useState(0);

    const [ltDurationHours, setLtDurationHours] = useState(1);
    const [ltDurationMinutes, setLtDurationMinutes] = useState(30);
    const [ltYear, setLtYear] = useState(new Date().getFullYear());
    const [ltDescription, setLtDescription] = useState("");
    const [ltThumbnail, setLtThumbnail] = useState(null);
    const [ltThumbnailPreview, setLtThumbnailPreview] = useState(null);
    const [ltVideoUrl, setLtVideoUrl] = useState("");
    const [ltDirectorImages, setLtDirectorImages] = useState([]);
    const [ltProducerImages, setLtProducerImages] = useState([]);
    const [ltSingerImages, setLtSingerImages] = useState([]);

    const fileInputRef = useRef();

    // duration hours/mins local state for normal
    const [durationHours, setDurationHours] = useState(Math.floor(duration / 60));
    const [durationMinutes, setDurationMinutes] = useState(duration % 60);

    const availableAuditoriums = ["Audi 1", "Audi 2", "Audi 3"];
    const [auditorium, setAuditorium] = useState("Audi 1");
    const [customerAuditorium, setCustomerAuditorium] = useState("");

    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const total = (Number(durationHours) || 0) * 60 + (Number(durationMinutes) || 0);
        setDuration(total);
    }, [durationHours, durationMinutes]);

    const availableCategories = ["Action", "Horror", "Comedy", "Adventure"];

    function toggleCategory(cat) {
        setCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    }

    const handlePosterChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        setPoster(file);
        const reader = new FileReader();
        reader.onload = (ev) => setPosterPreview(ev.target.result);
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const handleLtThumbnailChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        setLtThumbnail(file);
        const reader = new FileReader();
        reader.onload = (ev) => setLtThumbnailPreview(ev.target.result);
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const readFilesToPreviewsWithMeta = (files, setter, metaType = null) => {
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
            setter((prev) => [...prev, ...items])
        });
    };

    const handleMultipleFiles = (e, setter, metaType = null) => {
        if (!e.target.files) return;
        readFilesToPreviewsWithMeta(e.target.files, setter, metaType);
        e.target.value = null;
    };

    const readFilesToNamedPreviews = (files, setter) => {
        const arr = Array.from(files);
        const readers = arr.map((file) => {
            return new Promise((res) => {
                const r = new FileReader();
                r.onload = (e) => res({
                    file, preview: e.target.result, name: ""
                });
                r.readAsDataURL(file);
            });
        });
        Promise.all(readers).then((items) => {
            setter((prev) => [...prev, ...items])
        });
    };

    const handleMultipleNamedFiles = (e, setter) => {
        if (!e.target.files) return;
        readFilesToNamedPreviews(e.target.files, setter);
        e.target.value = null;
    };

    const removePreview = (id, setter) => {
        setter((prev) => prev.filter((p, idx) => idx !== id));
    };

    // FIX: was referencing an undefined `idx` variable — now uses the `id` param correctly
    const updateNamedItemName = (id, setter, value) => {
        setter((prev) =>
            prev.map((it, i) => (i === id ? { ...it, name: value } : it))
        );
    };

    const updateMetaField = (idx, setter, field, value) => {
        setter((prev) =>
            prev.map((it, i) => (i === idx ? { ...it, [field]: value } : it))
        );
    };

    function addSlot() {
        setSlots((s) => [
            ...s,
            { id: Date.now() + Math.random(), date: "", time: "", ampm: "AM" },
        ]);
    }
    function removeSlot(id) {
        setSlots((s) => s.filter((slot) => slot.id !== id));
    }
    function updateSlot(id, field, value) {
        setSlots((s) =>
            s.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
        );
    }

    function resetForm() {
        setMovieName("");
        setCategories([]);
        setPoster(null);
        setPosterPreview(null);
        setTrailerUrl("");
        setVideoUrl("");
        setRating(7.5);
        setDuration(120);
        setDurationHours(Math.floor(120 / 60));
        setDurationMinutes(120 % 60);
        setSlots([{ id: Date.now(), date: "", time: "", ampm: "AM" }]);
        setCastImages([]);
        setDirectorImages([]);
        setProducerImages([]);
        setStory("");
        setMovieType("normal");
        setStandardSeaterPrice(0);
        setReclinerSeaterPrice(0);
        setLtDurationHours(1);
        setLtDurationMinutes(30);
        setLtYear(new Date().getFullYear());
        setLtDescription("");
        setLtThumbnail(null);
        setLtThumbnailPreview(null);
        setLtVideoUrl("");
        setLtDirectorImages([]);
        setLtProducerImages([]);
        setLtSingerImages([]);
        setAuditorium("Audi 1");
        setCustomerAuditorium("");
    }

    function validate() {
        if (movieType === 'latestTrailers') {
            if (!movieName.trim()) return 'Please enter title for latest trailer.';
            if (!categories.length) return 'Please choose at least one genre for latest trailer.';
            if (!ltThumbnail) return 'Please select a thumbnail image for latest trailer.';
            if (!ltVideoUrl.trim()) return 'Please provide the video URL for latest trailer.';
            if (!ltDescription.trim()) return 'Please add a description for latest trailer.';
            if (!ltYear) return 'Please enter year for latest trailer.';
            const badDirector = ltDirectorImages.find(
                (d) => d && (!d.name || !d.name.trim())
            );
            if (badDirector) return 'Please add a name for every director image.';
            const badProducer = ltProducerImages.find(
                (d) => d && (!d.name || !d.name.trim())
            );
            if (badProducer) return 'Please add a name for every producer image.';
            const badSinger = ltSingerImages.find(
                (d) => d && (!d.name || !d.name.trim())
            );
            if (badSinger) return 'Please add a name for every singer image.';
            return null;
        }

        if (!movieName.trim()) return 'Please enter movie name.';

        // FIX: poster is now required for every movie type, including Coming Soon
        if (!poster) return 'Please add a poster image';

        if (movieType !== 'comingSoon') {
            if (!categories.length) return 'Please choose at least one category.';
        }

        if (movieType === 'normal' || movieType === 'featured') {
            if (
                Number.isNaN(Number(standardSeatPrice)) ||
                Number(standardSeatPrice) <= 0
            )
                return 'Please enter a valid standard seat price.';
            if (
                Number.isNaN(Number(reclinerSeatPrice)) ||
                Number(reclinerSeatPrice) <= 0
            )
                return 'Please enter a valid recliner seat price.';

            const finalAuditorium =
                auditorium === 'other' ? (customerAuditorium || "").trim() : auditorium;
            if (!finalAuditorium) return 'Please select auditorium.';
        }

        if (movieType === 'normal' || movieType === 'featured') {
            const badCast = castImages.find((c) => {
                if (!c) return false;
                return !c.name || !c.name.trim() || !c.role || !c.role.trim();
            });
            if (badCast) return 'Please add name and role for every cast image.';
            const badDirector = directorImages.find(
                (d) => d && (!d.name || !d.name.trim())
            );
            if (badDirector) return 'Please add name for every director image.';
            const badProducer = producerImages.find(
                (p) => p && (!p.name || !p.name.trim())
            );
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
    };

    async function hanldeSubmit(e) {
        e.preventDefault();
        const error = validate();
        if (error) return toast.error(error);

        setIsUploading(true);
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
                directors: ltDirectorImages.map((d) => ({
                    name: d.name || "",
                    file: d.file ? d.file.name : null,
                })),
                producers: ltProducerImages.map((p) => ({
                    name: p.name || "",
                    file: p.file ? p.file.name : null,
                })),
                singers: ltSingerImages.map((s) => ({
                    name: s.name || "",
                    file: s.file ? s.file.name : null,
                })),
            };

            form.append('movieName', movieName);
            form.append('latestTrailer', JSON.stringify(latestTrailerObj));

            if (ltThumbnail) form.append('ltThumbnail', ltThumbnail);

            appendFilesToForm(form, 'ltDirectorFiles', ltDirectorImages);
            appendFilesToForm(form, 'ltProducerFiles', ltProducerImages);
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
            form.append(
                'seatPrices',
                JSON.stringify({ standard: Number(standardSeatPrice), recliner: Number(reclinerSeatPrice), })
            );

            const finalAuditorium = auditorium === 'other' ?
                customerAuditorium.trim() || 'Audi 1' : auditorium;
            form.append('auditorium', finalAuditorium);

            form.append(
                'cast',
                JSON.stringify(
                    castImages.map((c) => ({
                        name: c.name || '',
                        role: c.role || "",
                        file: c.file ? c.file.name : null,
                    }))
                )
            );
            form.append('directors', JSON.stringify(
                directorImages.map((d) => ({
                    name: d.name || "",
                    file: d.file ? d.file.name : null,
                }))
            ));
            form.append('story', story || '');

            appendFilesToForm(form, 'castFiles', castImages);
            appendFilesToForm(form, 'directorFiles', directorImages);
            appendFilesToForm(form, 'producerFiles', producerImages);
        }

        try {
            const resp = await axios.post(`${API_HOST}/api/movies`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (resp?.data?.success) {
                toast.success('Movie added successfully!');
                resetForm();
            }
            else {
                toast.error(resp?.data?.message || 'Unexpected error from server')
            }
        } catch (error) {
            console.error('submit error: ', error);
            const msg =
                error?.response?.data?.message || error.message || 'Failed to upload.';
            toast.error(msg);
        } finally {
            setIsUploading(false);
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
                        <label className={addMoviePageStyles.radioLabel}>
                            <input type="radio"
                                name='movieType'
                                checked={movieType === 'normal'}
                                onChange={() => setMovieType('normal')}
                                className={addMoviePageStyles.radioInput}
                            />
                            <span>Normal</span>
                        </label>
                        <label className={addMoviePageStyles.radioLabel}>
                            <input type="radio"
                                name='movieType'
                                checked={movieType === 'featured'}
                                onChange={() => setMovieType('featured')}
                                className={addMoviePageStyles.radioInput}
                            />
                            <span>Featured</span>
                        </label>
                        <label className={addMoviePageStyles.radioLabel}>
                            <input type="radio"
                                name='movieType'
                                checked={movieType === 'comingSoon'}
                                onChange={() => setMovieType('comingSoon')}
                                className={addMoviePageStyles.radioInput}
                            />
                            <span>Coming Soon</span>
                        </label>
                        <label className={addMoviePageStyles.radioLabel}>
                            <input type="radio"
                                name='movieType'
                                checked={movieType === 'latestTrailers'}
                                onChange={() => setMovieType('latestTrailers')}
                                className={addMoviePageStyles.radioInput}
                            />
                            <span>Latest Trailers</span>
                        </label>
                    </div>

                    {!isLatestTrailer && (
                        <>
                            <div className={addMoviePageStyles.section}>
                                <div className={addMoviePageStyles.gridCols2}>

                                    {/* FIX: poster upload is now shown for Coming Soon too (removed !isComingSoon guard) */}
                                    <div className={addMoviePageStyles.inputContainer}>
                                        <label className={addMoviePageStyles.label}>Poster Image</label>
                                        {posterPreview ? (
                                            <div className={addMoviePageStyles.previewContainer}>
                                                <img src={posterPreview} alt="poster preview" className={addMoviePageStyles.previewImage} />
                                                <button
                                                    type="button"
                                                    onClick={() => { setPoster(null); setPosterPreview(null); }}
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
                                                onChange={(e) => setMovieName(e.target.value)}
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
                                                    <input
                                                        type="number"
                                                        value={standardSeatPrice}
                                                        onChange={(e) => setStandardSeaterPrice(e.target.value)}
                                                        className={addMoviePageStyles.input}
                                                    />
                                                </div>
                                                <div className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Recliner Seat Price (required)</label>
                                                    <input
                                                        type="number"
                                                        value={reclinerSeatPrice}
                                                        onChange={(e) => setReclinerSeaterPrice(e.target.value)}
                                                        className={addMoviePageStyles.input}
                                                    />
                                                </div>
                                                <div className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Auditorium</label>
                                                    <select
                                                        value={auditorium}
                                                        onChange={(e) => setAuditorium(e.target.value)}
                                                        className={addMoviePageStyles.select}
                                                    >
                                                        {availableAuditoriums.map((a) => (
                                                            <option key={a} value={a}>{a}</option>
                                                        ))}
                                                        <option value="other">Other</option>
                                                    </select>
                                                    {auditorium === 'other' && (
                                                        <input
                                                            value={customerAuditorium}
                                                            onChange={(e) => setCustomerAuditorium(e.target.value)}
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
                                                        onChange={(e) => setTrailerUrl(e.target.value)}
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
                                                        onChange={(e) => setRating(e.target.value)}
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
                                                        onChange={(e) => setDurationHours(e.target.value)}
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
                                                        min="0"
                                                        max="59"
                                                        value={durationMinutes}
                                                        onChange={(e) => setDurationMinutes(e.target.value)}
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
                                        onFiles={(e) => handleMultipleFiles(e, setCastImages, 'nameRole')}
                                        remove={(idx) => removePreview(idx, setCastImages)}
                                        updateMeta={(idx, field, value) => updateMetaField(idx, setCastImages, field, value)}
                                    />
                                    <Uploader
                                        title="Director Photos"
                                        icon={<ImageIcon className="size-4" />}
                                        items={directorImages}
                                        onFiles={(e) => handleMultipleFiles(e, setDirectorImages, 'name')}
                                        remove={(idx) => removePreview(idx, setDirectorImages)}
                                        updateMeta={(idx, field, value) => updateMetaField(idx, setDirectorImages, field, value)}
                                    />
                                    <Uploader
                                        title="Producer Photos"
                                        icon={<ImageIcon className="size-4" />}
                                        items={producerImages}
                                        onFiles={(e) => handleMultipleFiles(e, setProducerImages, 'name')}
                                        remove={(idx) => removePreview(idx, setProducerImages)}
                                        updateMeta={(idx, field, value) => updateMetaField(idx, setProducerImages, field, value)}
                                    />
                                </div>
                            )}

                            {!isComingSoon && (
                                <div className={addMoviePageStyles.section}>
                                    <label className={addMoviePageStyles.label}>Story</label>
                                    <textarea
                                        value={story}
                                        onChange={(e) => setStory(e.target.value)}
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
                                                    onClick={() => { setLtThumbnail(null); setLtThumbnailPreview(null); }}
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
                                                onChange={(e) => setMovieName(e.target.value)}
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
                                                    onChange={(e) => setLtDurationHours(e.target.value)}
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
                                                    onChange={(e) => setLtDurationMinutes(e.target.value)}
                                                    className={addMoviePageStyles.input}
                                                />
                                            </div>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Year</label>
                                                <input
                                                    type="number"
                                                    value={ltYear}
                                                    onChange={(e) => setLtYear(e.target.value)}
                                                    className={addMoviePageStyles.input}
                                                />
                                            </div>
                                        </div>

                                        <div className={addMoviePageStyles.gridCols2}>
                                            <div className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Video URL</label>
                                                <input
                                                    value={ltVideoUrl}
                                                    onChange={(e) => setLtVideoUrl(e.target.value)}
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
                                                    onChange={(e) => setRating(e.target.value)}
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
                                    onChange={(e) => setLtDescription(e.target.value)}
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
                                    onFiles={(e) => handleMultipleNamedFiles(e, setLtDirectorImages)}
                                    remove={(idx) => removePreview(idx, setLtDirectorImages)}
                                    updatName={(idx, value) => updateNamedItemName(idx, setLtDirectorImages, value)}
                                />
                                <NamedUploader
                                    title="Producer Photos"
                                    icon={<ImageIcon className="size-4" />}
                                    items={ltProducerImages}
                                    onFiles={(e) => handleMultipleNamedFiles(e, setLtProducerImages)}
                                    remove={(idx) => removePreview(idx, setLtProducerImages)}
                                    updatName={(idx, value) => updateNamedItemName(idx, setLtProducerImages, value)}
                                />
                                <NamedUploader
                                    title="Singer Photos"
                                    icon={<Users className="size-4" />}
                                    items={ltSingerImages}
                                    onFiles={(e) => handleMultipleNamedFiles(e, setLtSingerImages)}
                                    remove={(idx) => removePreview(idx, setLtSingerImages)}
                                    updatName={(idx, value) => updateNamedItemName(idx, setLtSingerImages, value)}
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
            <ToastContainer position='top-right' />
        </div>
    )
};


// UPLOADER FUNCTION
function Uploader({ title, onFiles, items, remove, icon, updateMeta }) {
    return (
        <div className={addMoviePageStyles.uploaderContainer}>
            <div className={addMoviePageStyles.uploaderHeader}>
                <div className={addMoviePageStyles.uploaderTitle}>
                    {icon}
                    <h4 className={addMoviePageStyles.uploaderTitleText}>{title}</h4>
                </div>

                <label className={addMoviePageStyles.uploaderAddButton}>
                    + Add
                    <input type="file" multiple accept='image/*' onChange={onFiles} className={addMoviePageStyles.uploaderAddInput} />
                </label>
            </div>

            <div className={addMoviePageStyles.uploaderGrid}>
                {items && items.length ? (
                    items.map((it, idx) => (
                        <div key={idx} className={addMoviePageStyles.uploaderItem}>
                            <img src={it.preview} alt="preview" className={addMoviePageStyles.uploaderItemImage} />
                            <button type='button' onClick={() => remove(idx)} className={addMoviePageStyles.uploaderItemRemove}>
                                <X className={addMoviePageStyles.uploaderItemRemoveIcon} />
                            </button>

                            {typeof it.name !== 'undefined' && (
                                <div className='mt-2'>
                                    <input
                                        value={it.name}
                                        onChange={(e) => updateMeta && updateMeta(idx, 'name', e.target.value)}
                                        placeholder='Name'
                                        className={addMoviePageStyles.uploaderItemInput}
                                    />
                                </div>
                            )}

                            {typeof it.role !== 'undefined' && (
                                <div className='mt-2'>
                                    <input
                                        value={it.role}
                                        onChange={(e) => updateMeta && updateMeta(idx, 'role', e.target.value)}
                                        placeholder='Role'
                                        className={addMoviePageStyles.uploaderItemInput}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className={addMoviePageStyles.uploaderEmpty}>
                        No images added
                    </div>
                )}
            </div>
        </div>
    )
}


// for latestTrailer
function NamedUploader({ title, onFiles, items, remove, updatName, icon }) {
    return (
        <div className={addMoviePageStyles.uploaderContainer}>
            <div className={addMoviePageStyles.uploaderHeader}>
                <div className={addMoviePageStyles.uploaderTitle}>
                    {icon}
                    <h4 className={addMoviePageStyles.uploaderTitleText}>{title}</h4>
                </div>

                <label className={addMoviePageStyles.uploaderAddButton}>
                    + Add
                    <input type="file" multiple accept='image/*' onChange={onFiles} className={addMoviePageStyles.uploaderAddInput} />
                </label>
            </div>

            <div className={addMoviePageStyles.namedUploaderGrid}>
                {items && items.length ? (
                    items.map((it, idx) => (
                        <div key={idx} className={addMoviePageStyles.namedUploaderItem}>
                            <img src={it.preview} alt="preview" className={addMoviePageStyles.namedUploaderImage} />

                            <div className='flex-1'>
                                <input
                                    value={it.name}
                                    onChange={(e) => updatName(idx, e.target.value)}
                                    placeholder='Name'
                                    className={addMoviePageStyles.namedUploaderInput}
                                />
                                <div className={addMoviePageStyles.namedUploaderFileName}>
                                    File: {it.file?.name}
                                </div>
                            </div>
                            <button type='button' onClick={() => remove(idx)} className={addMoviePageStyles.uploaderItemRemove}>
                                <X className={addMoviePageStyles.uploaderItemRemoveIcon} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className={addMoviePageStyles.uploaderEmpty}>
                        No images added
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddPage