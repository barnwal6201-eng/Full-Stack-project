import Movie from "../models/movieModels.js";
import cloudinary from "../config/cloudnary.js";
import mongoose from "mongoose";
import { buildHlsFromUrl, TRAILER_SEGMENT_COUNT } from "../services/hlsService.js";

/* ---------- helpers ---------- */

const toFileObj = (file, resourceType = "image") => {
  if (!file) return null;
  return { url: file.path, publicId: file.filename, resourceType };
};

// HLS playlist built from the stored publicId (no second upload)
const toStreamUrl = (publicId) =>
  cloudinary.url(publicId, {
    resource_type: "video",
    streaming_profile: "auto",
    format: "m3u8",
    secure: true,
  });

// Deletes one Cloudinary file. Safe to call with null or with an old string value.
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

// Deletes every file multer uploaded in this request (used when saving fails)
const cleanupUploads = (files) =>
  Promise.all(
    Object.entries(files).flatMap(([field, list]) =>
      list.map((f) =>
        destroyFile(toFileObj(f, field === "trailerFile" ? "video" : "image"))
      )
    )
  );

const safeParseJSON = (v) => {
  if (!v) return null;
  if (typeof v === "object") return v;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
};

const urlOf = (f) => f?.url || null;

const attachPersonFiles = (people, uploaded = []) => {
  let cursor = 0;
  return (people || []).map((p) => ({
    name: p?.name || "",
    role: p?.role || "",
    file: p?.file ? toFileObj(uploaded[cursor++], "image") : null,
  }));
};

export const ltDurationToMins = (d) => {
  if (d == null) return null;
  if (typeof d === "number") return d;
  if (typeof d === "string") return Number(d) || null;
  return (Number(d.hours) || 0) * 60 + (Number(d.minutes) || 0);
};

const personToPreview = (p) => ({
  name: p?.name || "",
  role: p?.role || "",
  preview: urlOf(p?.file),
});

const normalizeItemForOutput = (it = {}) => {
  const lt = it.latestTrailers || null;
  const posterUrl = urlOf(it.poster);

  return {
    ...it,
    poster: posterUrl,
    thumbnail: urlOf(lt?.thumbnail) || posterUrl,
    videoUrl: it.videoUrl || null,
    trailerVideo: it.trailerVideo?.streamUrl ? it.trailerVideo : null,
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

export async function createMovie(req, res) {
  const files = req.files || {};

  try {
    const body = req.body || {};
    const one = (field) => files[field]?.[0];

    const posterFile = toFileObj(one("poster"), "image");
    const trailerVideo = toFileObj(one("trailerFile"), "video");
    

    const categories =
      safeParseJSON(body.categories) ||
      (body.categories
        ? String(body.categories)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : []);
    const slots = safeParseJSON(body.slots) || [];
    const seatPrices = safeParseJSON(body.seatPrices) || {
      standard: Number(body.standard || 0),
      recliner: Number(body.recliner || 0),
    };

    const cast = attachPersonFiles(safeParseJSON(body.cast), files.castFiles);
    const directors = attachPersonFiles(safeParseJSON(body.directors), files.directorFiles);
    const producers = attachPersonFiles(safeParseJSON(body.producers), files.producersFiles);

    const ltJson = safeParseJSON(body.latestTrailers) || {};
    const latestTrailers = {
      title: ltJson.title || "",
      genres: Array.isArray(ltJson.genres) ? ltJson.genres : [],
      duration: {
        hours: Number(ltJson.duration?.hours) || 0,
        minutes: Number(ltJson.duration?.minutes) || 0,
      },
      year: Number(ltJson.year) || undefined,
      description: ltJson.description || "",
      thumbnail: toFileObj(one("ltThumbnail"), "image"),
      videoId: ltJson.videoId || body.ltVideoUrl || "",
      directors: attachPersonFiles(ltJson.directors, files.ltDirectorFiles),
      producers: attachPersonFiles(ltJson.producers, files.ltProducersFiles),
      singers: attachPersonFiles(ltJson.singers, files.ltSingerFiles),
    };

    const auditoriumValue =
      typeof body.auditorium === "string" && body.auditorium.trim()
        ? body.auditorium.trim()
        : "Audi 1";

    const ALLOWED_TYPES = ["normal", "featured", "comingSoon", "latestTrailers"];
    const type = body.type;
    const movieName = String(body.movieName || body.title || "").trim();
    const rating =
      body.rating === undefined || body.rating === "" ? 0 : Number(body.rating);
    const duration = Number(body.duration) || 0;

    // validation 
    const errors = [];
    if (!ALLOWED_TYPES.includes(type)) errors.push("Invalid movie type.");
    if (!movieName) errors.push("Movie name is required.");
    if (Number.isNaN(rating) || rating < 0 || rating > 10)
      errors.push("Rating must be a number between 0 and 10.");

    if (type === "latestTrailers") {
      if (!latestTrailers.thumbnail) errors.push("Thumbnail is required.");
      if (!latestTrailers.videoId) errors.push("Video URL is required.");
      if (!latestTrailers.description) errors.push("Description is required.");
      if (!latestTrailers.genres.length) errors.push("At least one genre is required.");
    } else {
      if (!posterFile) errors.push("Poster is required.");

      if (type === "normal" || type === "featured") {
        if (!trailerVideo) errors.push("Trailer video is required.");
        if (!categories.length) errors.push("At least one category is required.");
        if (duration <= 0) errors.push("Duration must be greater than 0 minutes.");
        if (!body.story?.trim()) errors.push("Story is required.");
        if (!Array.isArray(slots) || !slots.length)
          errors.push("At least one show slot is required.");
        if (!(seatPrices.standard > 0) || !(seatPrices.recliner > 0))
          errors.push("Seat prices must be greater than 0.");
        if (!cast.length || !directors.length || !producers.length)
          errors.push("Cast, directors and producers are required.");
      }
    }

    if (errors.length) {
      await cleanupUploads(files);
      return res.status(400).json({ success: false, message: "Validation failed", errors });
    }

    // Create the ID first, so the video folder can use it
   const movieId = new mongoose.Types.ObjectId();

   // Cut the trailer into pieces and save the master playlist address
   if (trailerVideo) {
     trailerVideo.streamUrl = await buildHlsFromUrl(
     trailerVideo.url,
     String(movieId),
     TRAILER_SEGMENT_COUNT
   );
 }

    const doc = new Movie({
      _id: movieId,
      type,
      movieName,
      categories,
      poster: posterFile,
      videoUrl: body.videoUrl?.trim() || null,
      trailerVideo,                                 
      rating,
      duration,
      slots,
      seatPrices,
      auditorium: auditoriumValue,
      cast,
      directors,
      producers,
      story: body.story || "",
      latestTrailers: type === "latestTrailers" ? latestTrailers : undefined,
    });

    const saved = await doc.save();
    return res.status(201).json({
      success: true,
      message: "Movie created.",
      data: saved,
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
      limit = 50,
      search,
      latestTrailers,
      featured,
    } = req.query;

    let filter = {};
    if (typeof category === "string" && category.trim())
      filter.categories = { $in: [category.trim()] };
    if (typeof type === "string" && type.trim()) filter.type = type.trim();
    if (typeof search === "string" && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { movieName: { $regex: q, $options: "i" } },
        { "latestTrailers.title": { $regex: q, $options: "i" } },
        { story: { $regex: q, $options: "i" } },
      ];
    }
    if (latestTrailers && String(latestTrailers).toLowerCase() !== "false") {
      filter =
        Object.keys(filter).length === 0
          ? { type: "latestTrailers" }
          : { $and: [filter, { type: "latestTrailers" }] };
    }
    if (featured && String(featured).toLowerCase() === "true") {
      filter.$or = (filter.$or || []).concat([
        { featured: true },
        { isFeatured: true },
        { type: "featured" },
      ]);
    }

    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(200, parseInt(limit, 10) || 12);
    const skip = (pg - 1) * lim;

    const total = await Movie.countDocuments(filter);
    const items = await Movie.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(lim)
      .lean();

    return res.json({
      success: true,
      total,
      page: pg,
      limit: lim,
      items: items.map(normalizeItemForOutput),
    });
  } catch (err) {
    console.error("Getmovies Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}


export async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ success: false, message: "ID is required." });

    const item = await Movie.findById(id).lean();
    if (!item)
      return res.status(404).json({ success: false, message: "Movie not found" });

    return res.json({ success: true, item: normalizeItemForOutput(item) });
  } catch (err) {
    console.error("GetmoviesById Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}


export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ success: false, message: "ID is required." });

    const m = await Movie.findById(id).lean();
    if (!m)
      return res.status(404).json({ success: false, message: "Movie not found" });

    const lt = m.latestTrailers || {};
    const personFiles = (list) => (list || []).map((p) => p?.file);

    const toDelete = [
      m.poster,
      m.trailerVideo,
      lt.thumbnail,
      ...personFiles(m.cast),
      ...personFiles(m.directors),
      ...personFiles(m.producers),
      ...personFiles(lt.directors),
      ...personFiles(lt.producers),
      ...personFiles(lt.singers),
    ].filter(Boolean);

    await Promise.all(toDelete.map(destroyFile));
    await Movie.findByIdAndDelete(id);

    return res.json({ success: true, message: "Movie Deleted." });
  } catch (err) {
    console.error("DeleteMovie Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export default { createMovie, getMovies, getMovieById, deleteMovie };