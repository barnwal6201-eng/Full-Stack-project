import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudnary.js';
import { createMovie, deleteMovie, getMovieById, getMovies } from '../controllers/movieController.js';

const movieRouter = express.Router();

const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'movies',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg'],
    },
});

const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'movies/videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'webm', 'mkv'],
    },
});

const VIDEO_FIELDS = ['trailerFile'];
const storageFor = (fieldname) =>
    VIDEO_FIELDS.includes(fieldname) ? videoStorage : imageStorage;

const upload = multer({
    storage: {
        _handleFile(req, file, cb) {
            storageFor(file.fieldname)._handleFile(req, file, cb);
        },
        _removeFile(req, file, cb) {
            storageFor(file.fieldname)._removeFile(req, file, cb);
        },
    },
    limits: { fileSize: 100 * 1024 * 1024 },
}).fields([
    { name: "poster", maxCount: 1 },
    { name: "trailerUrl", maxCount: 1 },
    { name: "videoUrl", maxCount: 1 },
    { name: "trailerFile", maxCount: 1 },
    { name: "ltThumbnail", maxCount: 1 },
    { name: "castFiles", maxCount: 20 },
    { name: "directorFiles", maxCount: 20 },
    { name: "producersFiles", maxCount: 20 },
    { name: "ltDirectorFiles", maxCount: 20 },
    { name: "ltProducersFiles", maxCount: 20 },
    { name: "ltSingerFiles", maxCount: 20 },
]);

movieRouter.post('/', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('UPLOAD MIDDLEWARE ERROR:', err.message, err.stack);
            return res.status(400).json({
                success: false,
                message: err.message || 'File upload failed'
            });
        }
        next();
    });
}, createMovie);

movieRouter.get('/', getMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.delete('/:id', deleteMovie);

export default movieRouter;