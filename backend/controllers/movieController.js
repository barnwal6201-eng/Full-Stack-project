import mongoose from "mongoose";
import Movie from "../models/movieModels.js";
import path from 'path';
import fs from 'fs';

const API_BASE = 'http://localhost:5000';

/*---------------helpers---------- */
//Builds a full upload URL from a filename or return null if invalid
const getUploadUrl = (val) => {
    if(!val) return null;
    if(typeof val === 'string' && /^(https?:\/\/)/.test(val)) return val;
    const cleaned = String(val).replace(/^uploads\//, "");
    if(!cleaned) return null;
    return `${API_BASE}/uploads/${cleaned}`;
};

//Extracts the filename from a Url or upload path
const extractFilenameFromUrl = (u) => {
    if(!u || typeof u !== 'string') return null;
    const parts = u.split("/uploads/");
    if(parts[1]) return parts[1];
    if(u.startsWith("uploads/")) return u.replace(/^uploads\//, "");
    return /^[^\/]+\.[a-zA-Z0-9]+$/.test(u) ? u : null;
};

//Deletes a file form the uploads folder if it exists
const tryUnlinkUploadUrl = (urlOrFilename) => {
    const fn = extractFilenameFromUrl(urlOrFilename);
    if(!fn) return;
    const filepath = Path.join(process.cwd(), "uploads", fn);
    fs.unlink(filepath, (err) => {
        if(err) console.warn("Failed to unlink file", filepath, err?.message || err);
    }) ;
};

//Safely parses JSON and return null on failure
const safeParseJSON = (v) => {
    if(!v) return null;
    if(typeof v === "object") return v;
    try { return JSON.parse(v); } catch {return null};
};

//Normalizes a person file value to a simple filename
const normalizeLatestPersonFilename = (value) => {
    if(!value) return null;
    if(typeof value === 'string') {
        const fn = extractFilenameFromUrl(value);
        return fn || value;
    }
    if(typeof value === 'object'){
        const candidate = value.filename || value.path || value.url || value.file || value.image || value.preview || null;
        return candidate ? normalizeLatestPersonFilename(candidate) : null;
    }
    return null;
};

const personToPreview = (p) => {
    if(!p) return {name: "", role: "", preview: null};
    const candidate = p.preview || p.file || p.image || p.url || null;
    return {name: p.name || "", role: p.role || "", preview: candidate ? getUploadUrl(candidate) : null};
};

/*------------------shared transformeres----------------- */
const buildLatestTrailerPeople = (arr = []) => 
(arr || []).map((p) => ({
    name: (p && p.name) || "",
    role: (p && p.role) || "",
    file: normalizeLatestPersonFilename(p && (p.file || p.preview || p.url || p.image))
}));

const enrichLatestTrailerForOutput = (lt = {}) => {
    const copy = { ...lt };
    copy.thumbnail = copy.thumbnail ? getUploadUrl(copy.thumbnail) : copy.thumbnail || null;
    const mapPerson = (p) => {
        const c = { ...API_BASE(p || {})};
        c.preview = c.file ? getUploadUrl(c.file) : (c.preview ? getUploadUrl(c.preview) : null);
        c.name = c.name || "";
        c.role = c.role || "";
        return c;
    };
    copy.directors = (copy.directors || []).map(mapPerson);
    copy.producers = (copy.producers || []).map(mapPerson);
    copy.singers = (copy.singers || []).map(mapPerson);

    return copy;
};

const normalizeItemForOutput = (it = {}) => {
    const obj = { ...it };
    obj.thumbnail = it.latestTrailer?.thumbnail ? getUploadUrl(it.latestTrailer.thumbnail) : (it.poster ? getUploadUrl(it.poster) : null);
    obj.trailerUrl = it.trailerUrl || (it.latestTrailer?.url || it.latestTrailer?.videoId) || null;

    if(it.type === "latestTrailers" && it.latestTrailer) {
        const lt = it.latestTrailer;
        obj.genres = obj.genres || lt.genres || [];
        obj.year = obj.year || lt.year || null;
        obj.rating = obj.rating || lt.rating || null;
        obj.duration = obj.duration || lt.duration || null;
        obj.description = obj.description || lt.description || lt.excerpt || "";
    }

    obj.cast = (it.cast || []).map(personToPreview);
    obj.directors = (it.directors || []).map(personToPreview);
    obj.producers = (it.producers || []).map(personToPreview);

    if(it.latestTrailer) obj.latestTrailer = enrichLatestTrailerForOutput(it.latestTrailer);

    //NEW: include auditorium in normalized output (keep null if not present)
    obj.auditorium = it.auditorium || null;

    return obj;
}