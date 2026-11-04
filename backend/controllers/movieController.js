import mongoose from "mongoose";
import Movie from "../models/movieModels.js";
import cloudinary from "../config/cloudnary.js";
import {
  MOVIE_TYPES,
  toFileObj,
  withStreamUrl,
  validateMovie,
  readMovieInput,
} from "../utils.js";

//constants 

const DEFAULT_PAGE_LIMIT = 50;
const MAX_PAGE_LIMIT = 200;

// cleanup helpers 

const destroyFile = async (f) => {
  if (!f?.publicId) return;
  try {
    await cloudinary.uploader.destroy(f.publicId, {
      resource_type: f.resourceType || "image",
    });
  } catch (err) {
    console.error("Cloudinary delete failed:", f.publicId, err?.message || err);
  }
};

const cleanupUploads = (files) =>
  Promise.all(
    Object.entries(files).flatMap(([field, list]) =>
      list.map((f) =>
        destroyFile(toFileObj(f, field === "trailerFile" ? "video" : "image"))
      )
    )
  );

const asAsset = (file, resourceType) =>
  file?.publicId ? { ...file, resourceType } : null;

//output helpers 

const urlOf = (f) => f?.url || null;

const personToPreview = (p) => ({
  name: p?.name || "",
  role: p?.role || "",
  preview: urlOf(p?.file),
});

// document building 

const buildMovieDocument = (input) => {
  const common = {
    _id: new mongoose.Types.ObjectId(),
    type: input.type,
    movieName: input.movieName,
    rating: input.rating,
    videoUrl: input.videoUrl,
    trailerVideo: input.trailer,
    auditorium: input.auditorium,
  };

  if (input.type === MOVIE_TYPES.LATEST_TRAILER) {
    const { latest } = input;
    return {
      ...common,
      categories: latest.genres,
      poster: null,
      duration: latest.duration.hours * 60 + latest.duration.minutes,
      slots: [],
      seatPrices: undefined,
      cast: [],
      directors: [],
      producers: [],
      story: "",
      latestTrailers: latest,
    };
  }

  return {
    ...common,
    categories: input.categories,
    poster: input.poster,
    duration: input.duration,
    slots: input.slots,
    seatPrices: input.seatPrices,
    cast: input.cast,
    directors: input.directors,
    producers: input.producers,
    story: input.story,
    latestTrailers: undefined,
  };
};

//output shaping 

export const ltDurationToMins = (d) => {
  if (d == null) return null;
  if (typeof d === "number") return d;
  if (typeof d === "string") return Number(d) || null;
  return (Number(d.hours) || 0) * 60 + (Number(d.minutes) || 0);
};

const normalizeItemForOutput = (it = {}) => {
  const lt = it.latestTrailers || null;
  const posterUrl = urlOf(it.poster);

  return {
    ...it,
    poster: posterUrl,
    thumbnail: urlOf(lt?.thumbnail) || posterUrl,
    videoUrl: it.videoUrl || null,
    trailerVideo: withStreamUrl(it.trailerVideo),
    cast: (it.cast || []).map(personToPreview),
    directors: (it.directors || []).map(personToPreview),
    producers: (it.producers || []).map(personToPreview),
    latestTrailers: lt
      ? {
          ...lt,
          thumbnail: urlOf(lt.thumbnail),
          directors: (lt.directors || []).map(personToPreview),
          producers: (lt.producers || []).map(personToPreview),
          singers: (lt.singers || []).map(personToPreview),
        }
      : null,
    auditorium: it.auditorium || null,
  };
};

//controllers 

export async function createMovie(req, res) {
  const files = req.files || {};

  try {
    const input = readMovieInput(req);

    const errors = validateMovie(input);
    if (errors.length) {
      await cleanupUploads(files);
      return res
        .status(400)
        .json({ success: false, message: "Validation failed", errors });
    }

    const saved = await new Movie(buildMovieDocument(input)).save();

    return res.status(201).json({
      success: true,
      message: "Movie created.",
      data: normalizeItemForOutput(saved.toObject()),
    });
  } catch (err) {
    await cleanupUploads(files);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }

    console.error("CreateMovie Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function getMovies(req, res) {
  try {
    const {
      category,
      type,
      sort = "-createdAt",
      page = 1,
      limit = DEFAULT_PAGE_LIMIT,
      search,
      latestTrailers,
      featured,
    } = req.query;

    const filter = {};
    const clauses = [];

    if (typeof category === "string" && category.trim()) {
      filter.categories = { $in: [category.trim()] };
    }

    if (typeof type === "string" && type.trim()) {
      filter.type = type.trim();
    }

    if (latestTrailers && String(latestTrailers).toLowerCase() !== "false") {
      filter.type = MOVIE_TYPES.LATEST_TRAILER;
    }

    if (typeof search === "string" && search.trim()) {
      const q = search.trim();
      clauses.push({
        $or: [
          { movieName: { $regex: q, $options: "i" } },
          { "latestTrailers.title": { $regex: q, $options: "i" } },
          { story: { $regex: q, $options: "i" } },
        ],
      });
    }

    if (featured && String(featured).toLowerCase() === "true") {
      clauses.push({
        $or: [
          { featured: true },
          { isFeatured: true },
          { type: MOVIE_TYPES.FEATURED },
        ],
      });
    }

    if (clauses.length) filter.$and = clauses;

    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(MAX_PAGE_LIMIT, parseInt(limit, 10) || DEFAULT_PAGE_LIMIT);
    const skip = (pg - 1) * lim;

    const [total, items] = await Promise.all([
      Movie.countDocuments(filter),
      Movie.find(filter).sort(sort).skip(skip).limit(lim).lean(),
    ]);

    return res.json({
      success: true,
      total,
      page: pg,
      limit: lim,
      items: items.map(normalizeItemForOutput),
    });
  } catch (err) {
    console.error("GetMovies Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required." });
    }

    const item = await Movie.findById(id).lean();
    if (!item) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    return res.json({ success: true, item: normalizeItemForOutput(item) });
  } catch (err) {
    console.error("GetMovieById Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required." });
    }

    const m = await Movie.findById(id).lean();
    if (!m) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    const lt = m.latestTrailers || {};
    const personFiles = (list) => (list || []).map((p) => p?.file).filter(Boolean);

    const people = [m.cast, m.directors, m.producers, lt.directors, lt.producers, lt.singers]
      .flatMap(personFiles)
      .map((f) => asAsset(f, "image"));

    const assets = [
      asAsset(m.poster, "image"),
      asAsset(m.trailerVideo, "video"),
      asAsset(lt.thumbnail, "image"),
      ...people,
    ].filter(Boolean);

    await Promise.all(assets.map(destroyFile));
    await Movie.findByIdAndDelete(id);

    return res.json({ success: true, message: "Movie Deleted." });
  } catch (err) {
    console.error("DeleteMovie Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}