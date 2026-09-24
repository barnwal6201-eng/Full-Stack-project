import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudnary.js';
import { createMovie, deleteMovie, getMovieById, getMovies } from '../controllers/movieController.js';

const movieRouter = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'movies',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
})

const upload = multer({ storage }).fields([
    {name: "poster", maxCount: 1},
    {name: "trailerUrl", maxCount: 1},
    {name: "videoUrl", maxCount: 1},
    {name: "ltThumbnail", maxCount: 1},
    {name: "castFiles", maxCount: 20},
    {name: "directorFiles", maxCount: 20},
    {name: "producersFiles", maxCount: 20},
    {name: "ltDirectorFiles", maxCount: 20},
    {name: "ltProducersFiles", maxCount: 20},
    {name: "ltSingerFiles", maxCount: 20},
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