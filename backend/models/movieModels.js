import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    url: { type: String, trim: true, default: null },
    publicId: { type: String, trim: true, default: null },
    resourceType: { type: String, enum: ["image", "video"], default: "image" },
    streamUrl: { type: String, trim: true, default: null },
  },
  { _id: false }
);

const personSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    role: { type: String, trim: true, default: "" },
    file: { type: fileSchema, default: null },
  },
  { _id: false }
);

const slotSchema = new mongoose.Schema(
  {
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    ampm: { type: String, enum: ["AM", "PM"], default: "AM" },
  },
  { _id: false }
);

const latestTrailerSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    genres: { type: [String], default: [] },
    duration: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
    },
    year: { type: Number },
    description: { type: String, trim: true },
    thumbnail: { type: fileSchema, default: null },
    videoId: { type: String, trim: true }, 
    directors: [personSchema],
    producers: [personSchema],
    singers: [personSchema],
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["normal", "featured", "comingSoon", "latestTrailers"],
      default: "normal",
    },
    movieName: { type: String, trim: true },
    categories: { type: [String], default: [] },
    poster: { type: fileSchema, default: null },
    videoUrl: { type: String, trim: true },   
    trailerVideo: { type: fileSchema, default: null }, 
    rating: { type: Number, default: 0 },
    duration: { type: Number, default: 0 }, 
    slots: [slotSchema],
    seatPrices: {
      standard: { type: Number, default: 0 },
      recliner: { type: Number, default: 0 },
    },
    auditorium: { type: String, trim: true, default: "Audi 1" },
    cast: [personSchema],
    directors: [personSchema],
    producers: [personSchema],
    story: { type: String, trim: true },
    latestTrailers: latestTrailerSchema,
  },
  { timestamps: true }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
export default Movie;