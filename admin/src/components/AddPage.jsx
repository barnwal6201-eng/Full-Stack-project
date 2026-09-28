import React, { useEffect, useReducer, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { addMoviePageCustomStyles, addMoviePageStyles } from '../assets/dummyStyles'
import { Film, X, Image as ImageIcon, Users, Clock, Star, Play, Plus } from 'lucide-react'
import Uploader from './Uploader'
import NamedUploader from './NameUploader'
import { initialState, addPageReducer } from './addPageReducer'
import TimeSelect from './TimeSelect'
import { availableAuditoriums, availableCategories } from '../utils'
import RenderImageUpload from './RenderImageUpload'

const API_HOST = import.meta.env.VITE_API_BASE_URL;

const FieldError = ({ msg }) =>
    msg ? <p className={addMoviePageStyles.errorText}>{msg}</p> : null;

const AddPage = () => {
    const [errors, setErrors] = useState({});
    const clearError = (key) =>
        setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));

    const [state, rawDispatch] = useReducer(addPageReducer, initialState);
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

    const cls = (base, key) =>
        `${base} ${errors[key] ? addMoviePageStyles.inputError : ''}`;

    const dispatch = (action) => {
        rawDispatch(action);
        const map = {
            TOGGLE_CATEGORY: 'categories',
            ADD_SLOTS: 'slots',
            UPDATE_SLOTS: 'slots',
            REMOVE_SLOTS: 'slots',
        };
        if (action.type === 'SET_FIELD') {
            clearError(
                action.field === 'durationHours' || action.field === 'durationMinutes'
                    ? 'duration'
                    : action.field
            );
        } else if (action.type === 'SET_FIELDS') {
            Object.keys(action.fields).forEach(clearError);
        } else if (['ADD_ITEMS', 'UPDATE_ITEM', 'REMOVE_ITEM'].includes(action.type)) {
            clearError(action.field);
        } else if (action.type === 'RESET') {
            setErrors({});
        } else if (map[action.type]) {
            clearError(map[action.type]);
        }
    };

    useEffect(() => {
        const total = (Number(durationHours) || 0) * 60 + (Number(durationMinutes) || 0);
        dispatch({ type: 'SET_FIELD', field: 'duration', value: total });
    }, [durationHours, durationMinutes]);

    const set = (field) => (value) => dispatch({ type: 'SET_FIELD', field, value });

    const toggleCategory = (cat) => dispatch({ type: 'TOGGLE_CATEGORY', category: cat });

    const handleSingleImage = (fileField, previewField) => (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        dispatch({ type: 'SET_FIELD', field: fileField, value: file });
        const reader = new FileReader();
        reader.onload = (ev) =>
            dispatch({ type: 'SET_FIELD', field: previewField, value: ev.target.result });
        reader.readAsDataURL(file);
        e.target.value = null;
    };

    const handleMultipleFiles = (e, field, metaType = null) => {
        if (!e.target.files) return;
        const readers = Array.from(e.target.files).map(
            (file) =>
                new Promise((res) => {
                    const r = new FileReader();
                    r.onload = (ev) =>
                        res({
                            file,
                            preview: ev.target.result,
                            ...(metaType === 'name' ? { name: '' } : {}),
                            ...(metaType === 'nameRole' ? { name: '', role: '' } : {}),
                        });
                    r.readAsDataURL(file);
                })
        );
        Promise.all(readers).then((items) => dispatch({ type: 'ADD_ITEMS', field, items }));
        e.target.value = null;
    };

    const handleMultipleNamedFiles = (e, field) => handleMultipleFiles(e, field, 'name');

    const removePreview = (index, field) => dispatch({ type: 'REMOVE_ITEM', field, index });
    const updateNamedItemName = (index, field, value) =>
        dispatch({ type: 'UPDATE_ITEM', field, index, key: 'name', value });
    const updateMetaField = (index, field, key, value) =>
        dispatch({ type: 'UPDATE_ITEM', field, index, key, value });

    const addSlot = () => dispatch({ type: 'ADD_SLOTS' });
    const removeSlot = (id) => dispatch({ type: 'REMOVE_SLOTS', id });
    const updateSlot = (id, field, value) => dispatch({ type: 'UPDATE_SLOTS', id, field, value });
    const resetForm = () => dispatch({ type: 'RESET' });

    function validate() {
        const e = {};

        const checkList = (list, key, requireRole = false) => {
            const itemErrors = {};
            list.forEach((item, i) => {
                if (!item) return;
                const m = {};
                if (!item.name || !item.name.trim()) m.name = 'Name is required.';
                if (requireRole && (!item.role || !item.role.trim())) m.role = 'Role is required.';
                if (Object.keys(m).length) itemErrors[i] = m;
            });
            if (Object.keys(itemErrors).length) e[key] = itemErrors;
        };

        if (movieType === 'latestTrailers') {
            if (!movieName.trim()) e.movieName = 'Please enter a title.';
            if (!categories.length) e.categories = 'Choose at least one genre.';
            if (!ltThumbnail) e.ltThumbnail = 'Please select a thumbnail image.';
            if (!ltVideoUrl.trim()) e.ltVideoUrl = 'Please provide the video URL.';
            if (!ltDescription.trim()) e.ltDescription = 'Please add a description.';
            if (!ltYear) e.ltYear = 'Please enter the year.';
            checkList(ltDirectorImages, 'ltDirectorImages');
            checkList(ltProducerImages, 'ltProducerImages');
            checkList(ltSingerImages, 'ltSingerImages');
            return e;
        }

        if (!movieName.trim()) e.movieName = 'Please enter movie name.';
        if (!poster) e.poster = 'Please add a poster image.';

        if (movieType !== 'comingSoon' && !categories.length)
            e.categories = 'Choose at least one category.';

        if (movieType === 'normal' || movieType === 'featured') {
            const total = (Number(durationHours) || 0) * 60 + (Number(durationMinutes) || 0);
            if (total <= 0) e.duration = 'Please enter a valid movie duration.';

            if (!story.trim()) e.story = 'Please write the movie story.';

            if (!castImages.length) e.castImagesEmpty = 'Please add at least one cast photo.';
            else checkList(castImages, 'castImages', true);

            if (!directorImages.length) e.directorImagesEmpty = 'Please add at least one director photo.';
            else checkList(directorImages, 'directorImages');

            if (!producerImages.length) e.producerImagesEmpty = 'Please add at least one producer photo.';
            else checkList(producerImages, 'producerImages');

            if (!(Number(standardSeatPrice) > 0)) e.standardSeatPrice = 'Enter a valid price.';
            if (!(Number(reclinerSeatPrice) > 0)) e.reclinerSeatPrice = 'Enter a valid price.';

            if (!slots || !slots.length) e.slots = 'Please add at least one slot.';
            else if (slots.some((s) => !s.date || !s.time))
                e.slots = 'Every slot needs a date and time.';

            if (auditorium === 'other' && !customerAuditorium.trim())
                e.auditorium = 'Please enter the auditorium name.';

            if (trailerUrl.trim() && !/^https?:\/\/.+/i.test(trailerUrl.trim()))
                e.trailerUrl = 'Enter a valid URL starting with http:// or https://';

            checkList(castImages, 'castImages', true);
            checkList(directorImages, 'directorImages');
            checkList(producerImages, 'producerImages');
        }
        return e;
    }

    function appendFilesToForm(form, fieldName, items) {
        if (!items || items.length === 0) return;
        items.forEach((it) => {
            if (it && it.file) form.append(fieldName, it.file);
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        const keys = Object.keys(errs);
        if (keys.length) {
            toast.error('Please fix the highlighted fields.');
            document
                .getElementById(`field-${keys[0].replace('Empty', '')}`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

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
                directors: ltDirectorImages.map((d) => ({ name: d.name || '', file: d.file ? d.file.name : null })),
                producers: ltProducerImages.map((p) => ({ name: p.name || '', file: p.file ? p.file.name : null })),
                singers: ltSingerImages.map((s) => ({ name: s.name || '', file: s.file ? s.file.name : null })),
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
            form.append('trailerUrl', trailerUrl || '');
            form.append('videoUrl', videoUrl || '');
            form.append('rating', String(rating));
            form.append('duration', String(duration));
            form.append('slots', JSON.stringify(slots));
            form.append(
                'seatPrices',
                JSON.stringify({
                    standard: Number(standardSeatPrice),
                    recliner: Number(reclinerSeatPrice),
                })
            );

            const finalAuditorium =
                auditorium === 'other' ? customerAuditorium.trim() || 'Audi 1' : auditorium;
            form.append('auditorium', finalAuditorium);

            form.append('cast', JSON.stringify(
                castImages.map((c) => ({ name: c.name || '', role: c.role || '', file: c.file ? c.file.name : null }))
            ));
            form.append('directors', JSON.stringify(
                directorImages.map((d) => ({ name: d.name || '', file: d.file ? d.file.name : null }))
            ));
            form.append('producers', JSON.stringify(
                producerImages.map((p) => ({ name: p.name || '', file: p.file ? p.file.name : null }))
            ));
            form.append('story', story || '');

            appendFilesToForm(form, 'castFiles', castImages);
            appendFilesToForm(form, 'directorFiles', directorImages);
            appendFilesToForm(form, 'producersFiles', producerImages);
        }

        try {
            const resp = await axios.post(`${API_HOST}/api/movies`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
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

    const renderCategoryButtons = () => (
        <div className={addMoviePageStyles.categoryContainer}>
            {availableCategories.map((cat) => (
                <button
                    type="button"
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`${addMoviePageStyles.categoryButton} ${
                        categories.includes(cat)
                            ? addMoviePageStyles.categoryButtonSelected
                            : addMoviePageStyles.categoryButtonNormal
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );

    return (
        <div className={addMoviePageStyles.pageContainer}>
            <style>{addMoviePageCustomStyles}</style>
            <div className={addMoviePageStyles.mainContainer}>
                <header className={addMoviePageStyles.header}>
                    <h1 className={`${addMoviePageStyles.title} font-cinzel`}>
                        <Film className={addMoviePageStyles.titleIcon} /> Add Movie
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className={addMoviePageStyles.form}>
                    <div className={addMoviePageStyles.radioContainer}>
                        {['normal', 'featured', 'comingSoon', 'latestTrailers'].map((t) => (
                            <label key={t} className={addMoviePageStyles.radioLabel}>
                                <input
                                    type="radio"
                                    name="movieType"
                                    checked={movieType === t}
                                    onChange={() => {
                                        set('movieType')(t);
                                        setErrors({});
                                    }}
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
                                    <div id="field-poster" className={addMoviePageStyles.inputContainer}>
                                        <label className={addMoviePageStyles.label}>Poster Image</label>
                                        {RenderImageUpload({
                                            preview: posterPreview,
                                            previewClass: addMoviePageStyles.previewImage,
                                            onRemove: () =>
                                                dispatch({ type: 'SET_FIELDS', fields: { poster: null, posterPreview: null } }),
                                            onChange: handleSingleImage('poster', 'posterPreview'),
                                            label: 'Click to upload poster',
                                        })}
                                        <FieldError msg={errors.poster} />
                                    </div>

                                    <div className="space-y-4">
                                        <div id="field-movieName" className={addMoviePageStyles.inputContainer}>
                                            <label className={addMoviePageStyles.label}>Movie Name</label>
                                            <input
                                                value={movieName}
                                                onChange={(e) => set('movieName')(e.target.value)}
                                                placeholder="Enter movie name"
                                                className={cls(addMoviePageStyles.input, 'movieName')}
                                            />
                                            <FieldError msg={errors.movieName} />
                                        </div>

                                        {!isComingSoon && (
                                            <div id="field-categories" className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Categories</label>
                                                {renderCategoryButtons()}
                                                <FieldError msg={errors.categories} />
                                            </div>
                                        )}

                                        {showFullFields && (
                                            <div className={addMoviePageStyles.gridCols3}>
                                                <div id="field-standardSeatPrice" className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Standard Seat Price (required)</label>
                                                    <input
                                                        type="number"
                                                        value={standardSeatPrice}
                                                        onChange={(e) => set('standardSeatPrice')(e.target.value)}
                                                        className={cls(addMoviePageStyles.input, 'standardSeatPrice')}
                                                    />
                                                    <FieldError msg={errors.standardSeatPrice} />
                                                </div>

                                                <div id="field-reclinerSeatPrice" className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Recliner Seat Price (required)</label>
                                                    <input
                                                        type="number"
                                                        value={reclinerSeatPrice}
                                                        onChange={(e) => set('reclinerSeatPrice')(e.target.value)}
                                                        className={cls(addMoviePageStyles.input, 'reclinerSeatPrice')}
                                                    />
                                                    <FieldError msg={errors.reclinerSeatPrice} />
                                                </div>

                                                <div id="field-auditorium" className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Auditorium</label>
                                                    <select
                                                        value={auditorium}
                                                        onChange={(e) => set('auditorium')(e.target.value)}
                                                        className={addMoviePageStyles.select}
                                                    >
                                                        {availableAuditoriums.map((a) => (
                                                            <option key={a} value={a} className="bg-gray-950 text-gray-200">{a}</option>
                                                        ))}
                                                        <option value="other" className="bg-gray-950 text-gray-200">Other</option>
                                                    </select>
                                                    {auditorium === 'other' && (
                                                        <input
                                                            value={customerAuditorium}
                                                            onChange={(e) => set('customerAuditorium')(e.target.value)}
                                                            placeholder="Enter auditorium name"
                                                            className={`${cls(addMoviePageStyles.input, 'auditorium')} mt-2`}
                                                        />
                                                    )}
                                                    <FieldError msg={errors.auditorium} />
                                                </div>
                                            </div>
                                        )}

                                        <div className={addMoviePageStyles.gridCols2}>
                                            {!isComingSoon && (
                                                <div id="field-trailerUrl" className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Trailer URL</label>
                                                    <div className="relative flex items-center">
                                                        <Play className="absolute left-3 size-4 opacity-70 pointer-events-none" />
                                                        <input
                                                            value={trailerUrl}
                                                            onChange={(e) => set('trailerUrl')(e.target.value)}
                                                            placeholder="https://"
                                                            className={`${cls(addMoviePageStyles.input, 'trailerUrl')} pl-9`}
                                                        />
                                                    </div>
                                                    <FieldError msg={errors.trailerUrl} />
                                                </div>
                                            )}

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

                                        <div id="field-duration">
                                            <div className={addMoviePageStyles.gridCols2}>
                                                <div className={addMoviePageStyles.inputContainer}>
                                                    <label className={addMoviePageStyles.label}>Duration (hours)</label>
                                                    <div className="relative flex items-center">
                                                        <Clock className="absolute left-3 size-4 opacity-70 pointer-events-none" />
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={durationHours}
                                                            onChange={(e) => set('durationHours')(e.target.value)}
                                                            onBlur={(e) =>
                                                                set('durationHours')(Math.max(0, Number(e.target.value) || 0))
                                                            }
                                                            className={`${cls(addMoviePageStyles.input, 'duration')} pl-9`}
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
                                                            onChange={(e) => set('durationMinutes')(e.target.value)}
                                                            onBlur={(e) =>
                                                                set('durationMinutes')(
                                                                    Math.min(59, Math.max(0, Number(e.target.value) || 0))
                                                                )
                                                            }
                                                            className={`${cls(addMoviePageStyles.input, 'duration')} pl-9`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <FieldError msg={errors.duration} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!isComingSoon && (
                                <div id="field-slots" className={addMoviePageStyles.section}>
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
                                                    <TimeSelect
                                                        value={slot.time}
                                                        onChange={(v) => updateSlot(slot.id, 'time', v)}
                                                        className={addMoviePageStyles.slotInput}
                                                    />
                                                    <select
                                                        value={slot.ampm}
                                                        onChange={(e) => updateSlot(slot.id, 'ampm', e.target.value)}
                                                        className={addMoviePageStyles.slotInput}
                                                    >
                                                        <option value="AM" className="bg-gray-950 text-gray-200">AM</option>
                                                        <option value="PM" className="bg-gray-950 text-gray-200">PM</option>
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
                                    <FieldError msg={errors.slots} />
                                </div>
                            )}

                            {showFullFields && (
                                <div className={addMoviePageStyles.gridCols3}>
                                    <div id="field-castImages">
                                        <Uploader
                                            title="Cast Photos"
                                            icon={<Users className="size-4" />}
                                            items={castImages}
                                            onFiles={(e) => handleMultipleFiles(e, 'castImages', 'nameRole')}
                                            remove={(idx) => removePreview(idx, 'castImages')}
                                            updateMeta={(idx, field, value) => updateMetaField(idx, 'castImages', field, value)}
                                            errors={errors.castImages}
                                        />
                                        <FieldError msg={errors.castImagesEmpty} />
                                    </div>
                                    <div id="field-directorImages">
                                        <Uploader
                                            title="Director Photos"
                                            icon={<ImageIcon className="size-4" />}
                                            items={directorImages}
                                            onFiles={(e) => handleMultipleFiles(e, 'directorImages', 'name')}
                                            remove={(idx) => removePreview(idx, 'directorImages')}
                                            updateMeta={(idx, field, value) => updateMetaField(idx, 'directorImages', field, value)}
                                            errors={errors.directorImages}
                                        />
                                        <FieldError msg={errors.directorImagesEmpty} />
                                    </div>
                                    <div id="field-producerImages">
                                        <Uploader
                                            title="Producer Photos"
                                            icon={<ImageIcon className="size-4" />}
                                            items={producerImages}
                                            onFiles={(e) => handleMultipleFiles(e, 'producerImages', 'name')}
                                            remove={(idx) => removePreview(idx, 'producerImages')}
                                            updateMeta={(idx, field, value) => updateMetaField(idx, 'producerImages', field, value)}
                                            errors={errors.producerImages}
                                        />
                                        <FieldError msg={errors.producerImagesEmpty} />
                                    </div>
                                </div>
                            )}

                            {!isComingSoon && (
                                <div id='field-story' className={addMoviePageStyles.section}>
                                    <label className={addMoviePageStyles.label}>Story</label>
                                    <textarea
                                        value={story}
                                        onChange={(e) => set('story')(e.target.value)}
                                        rows={5}
                                        placeholder="Write the movie story here..."
                                        className={addMoviePageStyles.textarea}
                                    />
                                    <FieldError msg={errors.story} />
                                </div>
                            )}
                        </>
                    )}

                    {isLatestTrailer && (
                        <>
                            <div className={addMoviePageStyles.section}>
                                <div className={addMoviePageStyles.gridCols2}>
                                    <div id="field-ltThumbnail" className={addMoviePageStyles.inputContainer}>
                                        <label className={addMoviePageStyles.label}>Thumbnail Image</label>
                                        {RenderImageUpload({
                                            preview: ltThumbnailPreview,
                                            previewClass: addMoviePageStyles.previewThumbnail,
                                            onRemove: () =>
                                                dispatch({ type: 'SET_FIELDS', fields: { ltThumbnail: null, ltThumbnailPreview: null } }),
                                            onChange: handleSingleImage('ltThumbnail', 'ltThumbnailPreview'),
                                            label: 'Click to upload thumbnail',
                                        })}
                                        <FieldError msg={errors.ltThumbnail} />
                                    </div>

                                    <div className="space-y-4">
                                        <div id="field-movieName" className={addMoviePageStyles.inputContainer}>
                                            <label className={addMoviePageStyles.label}>Title</label>
                                            <input
                                                value={movieName}
                                                onChange={(e) => set('movieName')(e.target.value)}
                                                placeholder="Enter title"
                                                className={cls(addMoviePageStyles.input, 'movieName')}
                                            />
                                            <FieldError msg={errors.movieName} />
                                        </div>

                                        <div id="field-categories" className={addMoviePageStyles.inputContainer}>
                                            <label className={addMoviePageStyles.label}>Genres</label>
                                            {renderCategoryButtons()}
                                            <FieldError msg={errors.categories} />
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
                                                    onChange={(e) => set('ltDurationMinutes')(e.target.value)}
                                                    className={addMoviePageStyles.input}
                                                />
                                            </div>
                                            <div id="field-ltYear" className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Year</label>
                                                <input
                                                    type="number"
                                                    value={ltYear}
                                                    onChange={(e) => set('ltYear')(e.target.value)}
                                                    className={cls(addMoviePageStyles.input, 'ltYear')}
                                                />
                                                <FieldError msg={errors.ltYear} />
                                            </div>
                                        </div>

                                        <div className={addMoviePageStyles.gridCols2}>
                                            <div id="field-ltVideoUrl" className={addMoviePageStyles.inputContainer}>
                                                <label className={addMoviePageStyles.label}>Video URL</label>
                                                <input
                                                    value={ltVideoUrl}
                                                    onChange={(e) => set('ltVideoUrl')(e.target.value)}
                                                    placeholder="https://"
                                                    className={cls(addMoviePageStyles.input, 'ltVideoUrl')}
                                                />
                                                <FieldError msg={errors.ltVideoUrl} />
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

                            <div id="field-ltDescription" className={addMoviePageStyles.section}>
                                <label className={addMoviePageStyles.label}>Description</label>
                                <textarea
                                    value={ltDescription}
                                    onChange={(e) => set('ltDescription')(e.target.value)}
                                    rows={4}
                                    placeholder="Write a short description..."
                                    className={cls(addMoviePageStyles.textarea, 'ltDescription')}
                                />
                                <FieldError msg={errors.ltDescription} />
                            </div>

                            <div className={addMoviePageStyles.gridCols3}>
                                <div id="field-ltDirectorImages">
                                    <NamedUploader
                                        title="Director Photos"
                                        icon={<ImageIcon className="size-4" />}
                                        items={ltDirectorImages}
                                        onFiles={(e) => handleMultipleNamedFiles(e, 'ltDirectorImages')}
                                        remove={(idx) => removePreview(idx, 'ltDirectorImages')}
                                        updatName={(idx, value) => updateNamedItemName(idx, 'ltDirectorImages', value)}
                                        errors={errors.ltDirectorImages}
                                    />
                                </div>
                                <div id="field-ltProducerImages">
                                    <NamedUploader
                                        title="Producer Photos"
                                        icon={<ImageIcon className="size-4" />}
                                        items={ltProducerImages}
                                        onFiles={(e) => handleMultipleNamedFiles(e, 'ltProducerImages')}
                                        remove={(idx) => removePreview(idx, 'ltProducerImages')}
                                        updatName={(idx, value) => updateNamedItemName(idx, 'ltProducerImages', value)}
                                        errors={errors.ltProducerImages}
                                    />
                                </div>
                                <div id="field-ltSingerImages">
                                    <NamedUploader
                                        title="Singer Photos"
                                        icon={<Users className="size-4" />}
                                        items={ltSingerImages}
                                        onFiles={(e) => handleMultipleNamedFiles(e, 'ltSingerImages')}
                                        remove={(idx) => removePreview(idx, 'ltSingerImages')}
                                        updatName={(idx, value) => updateNamedItemName(idx, 'ltSingerImages', value)}
                                        errors={errors.ltSingerImages}
                                    />
                                </div>
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
            <ToastContainer position="top-right" theme="dark" toastClassName="admin-toast"progressClassName="admin-toast-progress"/>
        </div>
    )
}
export default AddPage