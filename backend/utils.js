import cloudinary from "./config/cloudnary.js";

// ---------- constants ----------

export const MOVIE_TYPES = {
  NORMAL: "normal",
  FEATURED: "featured",
  COMING_SOON: "comingSoon",
  LATEST_TRAILER: "latestTrailers",
};

const ALLOWED_TYPES = Object.values(MOVIE_TYPES);
const FULL_DETAIL_TYPES = [MOVIE_TYPES.NORMAL, MOVIE_TYPES.FEATURED];
const MAX_RATING = 10;
export const DEFAULT_AUDITORIUM = "Audi 1";

// ---------- file helpers ----------

export const toFileObj = (file, resourceType = "image") => {
  if (!file) return null;
  return { url: file.path, publicId: file.filename, resourceType };
};

export const toStreamUrl = (publicId) => {
  if (!publicId) return null;

  const cloudName = cloudinary.config().cloud_name;
  if (!cloudName) {
    console.error("Cloudinary cloud_name is not configured");
    return null;
  }

  const cleanId = publicId.replace(/^video\/upload\//, "");
  return `https://res.cloudinary.com/${cloudName}/video/upload/sp_auto/${cleanId}.m3u8`;
};

export const buildTrailerVideo = (file) => {
  const trailer = toFileObj(file, "video");
  if (trailer?.publicId) {
    trailer.streamUrl = toStreamUrl(trailer.publicId);
  }
  return trailer;
};

export const withStreamUrl = (tv) => {
  if (!tv?.publicId) return null;
  return { ...tv, streamUrl: tv.streamUrl || toStreamUrl(tv.publicId) };
};

// ---------- parsing helpers ----------

export const safeParseJSON = (v) => {
  if (!v) return null;
  if (typeof v === "object") return v;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
};

// Pairs each person with the next uploaded file, in order.
export const attachPersonFiles = (people, uploaded = []) => {
  let cursor = 0;
  return (people || []).map((p) => ({
    name: p?.name || "",
    role: p?.role || "",
    file: p?.file ? toFileObj(uploaded[cursor++], "image") : null,
  }));
};

const parseCategories = (raw) => {
  const parsed = safeParseJSON(raw);
  if (Array.isArray(parsed)) return parsed;
  if (!raw) return [];
  return String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

const parseSeatPrices = (body) =>
  safeParseJSON(body.seatPrices) || {
    standard: Number(body.standard || 0),
    recliner: Number(body.recliner || 0),
  };

const parseLatestTrailer = (json, files, one, fallbackTitle) => ({
  title: json.title || fallbackTitle,
  genres: Array.isArray(json.genres) ? json.genres : [],
  duration: {
    hours: Number(json.duration?.hours) || 0,
    minutes: Number(json.duration?.minutes) || 0,
  },
  year: Number(json.year) || undefined,
  description: json.description || "",
  thumbnail: toFileObj(one("ltThumbnail"), "image"),
  directors: attachPersonFiles(json.directors, files.ltDirectorFiles),
  producers: attachPersonFiles(json.producers, files.ltProducersFiles),
  singers: attachPersonFiles(json.singers, files.ltSingerFiles),
});

// ---------- validation ----------

export const validateMovie = (input) => {
  const errors = [];
  const check = (ok, message) => {
    if (!ok) errors.push(message);
  };

  check(ALLOWED_TYPES.includes(input.type), "Invalid movie type.");
  check(input.movieName, "Movie name is required.");
  check(
    Number.isFinite(input.rating) && input.rating >= 0 && input.rating <= MAX_RATING,
    `Rating must be a number between 0 and ${MAX_RATING}.`
  );

  if (input.type === MOVIE_TYPES.LATEST_TRAILER) {
    const { latest } = input;
    check(latest.thumbnail, "Thumbnail is required.");
    check(input.trailer, "Trailer video is required.");
    check(latest.description.trim(), "Description is required.");
    check(latest.genres.length, "At least one genre is required.");
    return errors;
  }

  check(input.poster, "Poster is required.");

  if (FULL_DETAIL_TYPES.includes(input.type)) {
    check(input.trailer, "Trailer video is required.");
    check(input.categories.length, "At least one category is required.");
    check(input.duration > 0, "Duration must be greater than 0 minutes.");
    check(input.story.trim(), "Story is required.");
    check(
      Array.isArray(input.slots) && input.slots.length,
      "At least one show slot is required."
    );
    check(
      input.seatPrices.standard > 0 && input.seatPrices.recliner > 0,
      "Seat prices must be greater than 0."
    );
    check(
      input.cast.length && input.directors.length && input.producers.length,
      "Cast, directors and producers are required."
    );
  }

  return errors;
};

// ---------- input reader ----------

export const readMovieInput = (req) => {
  const body = req.body || {};
  const files = req.files || {};
  const one = (field) => files[field]?.[0];

  const movieName = String(body.movieName || body.title || "").trim();

  return {
    type: body.type,
    movieName,
    rating:
      body.rating === undefined || body.rating === "" ? 0 : Number(body.rating),
    duration: Number(body.duration) || 0,
    story: String(body.story || ""),
    videoUrl: String(body.videoUrl || "").trim() || null,
    auditorium:
      typeof body.auditorium === "string" && body.auditorium.trim()
        ? body.auditorium.trim()
        : DEFAULT_AUDITORIUM,
    categories: parseCategories(body.categories),
    slots: safeParseJSON(body.slots) || [],
    seatPrices: parseSeatPrices(body),
    poster: toFileObj(one("poster"), "image"),
    trailer: buildTrailerVideo(one("trailerFile")),
    cast: attachPersonFiles(safeParseJSON(body.cast), files.castFiles),
    directors: attachPersonFiles(safeParseJSON(body.directors), files.directorFiles),
    producers: attachPersonFiles(safeParseJSON(body.producers), files.producersFiles),
    latest: parseLatestTrailer(
      safeParseJSON(body.latestTrailers) || {},
      files,
      one,
      movieName
    ),
  };
};