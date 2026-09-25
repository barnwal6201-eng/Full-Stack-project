const API_BASE = import.meta.env.VITE_API_BASE;
const PLACEHOLDER = import.meta.env.VITE_PLACEHOLDER_IMG;

export const ROWS = [
  { id: "A", type: "Standard", count: 8 },
  { id: "B", type: "Standard", count: 8 },
  { id: "C", type: "Standard", count: 8 },
  { id: "D", type: "recliner", count: 8 },
  { id: "E", type: "recliner", count: 8 },
];

const to24Hour = (timeStr = "00:00", ampm = "") => {
  const [hRaw = "0", mRaw = "00"] = String(timeStr).split(":");
  let h = Number(hRaw || 0);
  const m = String(Number(mRaw) || 0).padStart(2, "0");
  const a = (ampm || "").toUpperCase();
  if (a === "AM" && h === 12) h = 0;
  if (a === "PM" && h !== 12) h += 12;
  return `${String(h).padStart(2, "0")}:${m}`;
};

const slotToISO = (slot) => {
  if (!slot) return null;
  if (typeof slot === "string") return slot;
  if (typeof slot === "object") {
    if (slot.date && (slot.time || slot.datetime || slot.iso)) {
      const hhmm = to24Hour(
        slot.time || slot.datetime || slot.iso || "00:00",
        slot.ampm || slot.amp || "",
      );
      return `${slot.date}T${hhmm}:00+05:30`;
    }
    if (slot.datetime) return slot.datetime;
    if (slot.time && typeof slot.time === "string") return slot.time;
  }
  return null;
};

const sameMinute = (a, b) => {
  if (!a || !b) return false;
  const da = new Date(a),
    db = new Date(b);
  if (isNaN(da.getTime()) || isNaN(db.getTime())) return false;
  da.setSeconds(0, 0);
  db.setSeconds(0, 0);
  return da.getTime() === db.getTime();
};

const getUploadUrl = (maybe) => {
  if(!maybe) return null;
  if(typeof maybe !== 'string') return null;
  if(maybe.startsWith("http://") || maybe.startsWith("https://")) return maybe;
  return `${API_BASE}/uploads/${String(maybe).replace(/^uploads\//, "")}`;
}

/** duration arrives as minutes (NumberInt) e.g. 158 -> "2h 38m" */
    const formatDuration = (duration) => {
    if (duration === null || duration === undefined || duration === "") return null;
    const mins = Number(duration);
    if (Number.isNaN(mins)) return String(duration);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
   };

/**Returns a human time string like  "1:30 PM"(12-hour) for the given ISO in timezone */
const formatTimeInTZ = (dateLike, timeZone = "Asia/Kolkata") => {
        const p = getParts(dateLike, timeZone);
        const hour = String(Number(p.hour));
        return `${hour}:${p.minute} ${String(
            p.dayPeriod ?? p.ampm ?? ""
        ).toUpperCase()}`;
    };

const getParts = (dateLike, timeZone) => {
    const dt = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
    const parts = new Intl.DateTimeFormat("en", {
        timeZone, year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", hour12: true,
    }).formatToParts(dt);
    const map = {};
    for (const p of parts) if (p.type !== "literal") map[p.type] = p.value;
    map.dayPeriod = map.dayPeriod || map.ampm || map.AMPM;
    return map;
    };

/**Returns date key 'YYYY-MM-DD' for the given date/ISO in given timezone */
    const formatDateKey = (dateLike, timeZone = "Asia/Kolkata") => {
        const p = getParts(dateLike, timeZone);
        return `${p.year}-${p.month}-${p.day}`;
    };

function extractYouTubeId(urlOrId) {
        if(!urlOrId) return null;
        if(/^[A-Za-z0-9_-]{6,}$/.test(urlOrId)) return urlOrId;

        const re = 
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i;
        const m = urlOrId.match(re);
        return m ? m[1] : null;
    };

  const categoriesList = [
  {id: "all", name: "All Movies"},
  {id: "action", name: "Action"},
  {id: "horror", name: "Horror"},
  {id: "comedy", name: "Comedy"},
  {id: "adventure", name: "Adventure"},
];

const mapBackendMovie = (m) => {
  const id = m._id || m.id || "";
  const title = m.movieName || m.title || "Untitled";
  const rawImg = m.poster || m.latestTrailer?.thumbnail || m.thumbnail || null;
  const image = getUploadUrl(rawImg) || PLACEHOLDER;

  const cat = (Array.isArray(m.categories) && m.categories[0]) || m.category ||
  (Array.isArray(m.latestTrailer?.genres) && m.latestTrailer.genres[0]) || "General";

  const category = String(cat || "General");

  return {id, title, image, category, raw: m};
};

const getInitialAvatar = (label = "?", size = 80) => {
    const letter = (label || "?").trim().charAt(0).toUpperCase() || "?";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
        <rect width="100%" height="100%" fill="#27272a"/>
        <text x="50%" y="50%" font-family="sans-serif" font-size="${size / 2.2}"
              text-anchor="middle" dy=".35em" fill="#a1a1aa">${letter}</text>
    </svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const extractFilenameFromUrl = (u) => {
    if (!u || typeof u !== 'string') return null;
    const parts = u.split("/uploads/");
    if (parts.length > 1) return parts[parts.length - 1];
    if (u.startsWith("uploads/")) return u.replace(/^uploads\//, "");
    return (!u.includes('/') && u.includes('.') && !u.endsWith('.')) ? u : null;
};

export default ROWS;
export {to24Hour, slotToISO, sameMinute, getUploadUrl, formatDuration, formatTimeInTZ, getParts, formatDateKey, extractYouTubeId, categoriesList, mapBackendMovie, getInitialAvatar};