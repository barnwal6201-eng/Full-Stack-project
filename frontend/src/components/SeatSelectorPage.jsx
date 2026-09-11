import React, { useEffect, useState, useMemo } from 'react'
import { seatSelectorStyles } from '../assets/dummyStyles'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CreditCard, Film, RockingChair, Rows, Sofa, Ticket } from 'lucide-react'
import { toast } from 'react-toastify'
import Tickets from './Tickets'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE;

const ROWS = [
        {id: 'A', type: 'Standard', count: 8},
        {id: 'B', type: 'Standard', count: 8},
        {id: 'C', type: 'Standard', count: 8},
        {id: 'D', type: 'recliner', count: 8},
        {id: 'E', type: 'recliner', count: 8},
    ];

const seatId = (r, n) => `${r}${n}`;

const to24Hour = (timeStr = "00:00", ampm = "") => {
    const [hRaw = "0", mRaw = "00"] = String(timeStr).split(":");
    let h = Number(hRaw || 0);
    const m = String(Number(mRaw) || 0).padStart(2, "0");
    const a = (ampm || "").toUpperCase();
    if(a === "AM" && h === 12) h = 0;
    if(a === "PM" && h !== 12) h += 12;
    return `${String(h).padStart(2, "0")}:${m}`;
};

const slotToISO = (slot) => {
    if(!slot) return null;
    if(typeof slot === "string") return slot;
    if(typeof slot === "object") {
        if(slot.date && (slot.time || slot.datetime || slot.iso)) {
            const hhmm = to24Hour(
                slot.time || slot.datetime || slot.iso || "00:00",
                slot.ampm || slot.amp || ""
            );
            return `${slot.date}T${hhmm}:00+05:30`;
        }
        if(slot.datetime) return slot.datetime;
        if(slot.time && typeof slot.time === "string") return slot.time;
    }
    return null;
};

const getAuthToken = () => 
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt") || null;

const normalizedSeatId = (s) => (s ? String(s).trim().toUpperCase() : "");

const sameMinute = (a, b) => {
    if(!a || !b) return false;
    const da = new Date(a),
       db = new Date(b);
    if(isNaN(da.getTime()) || isNaN(db.getTime())) return false;
    da.setSeconds(0, 0);
    db.setSeconds(0, 0);
    return da.getTime() === db.getTime();
};

export default function SeatSelectorPage()  {
    const {id, slot} = useParams();
    const movieIdParam = id;
    const slotKey = slot ? decodeURIComponent(slot) : ""
    const navigate = useNavigate();

    const [showTickets, setShowTickets] = useState(false);
    const [bgColor, setBgColor] = useState(true);
    const [ticketCount, SetTicketCount] = useState(1);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booked, setBooked] = useState(new Set());
    const [selected, setSelected] = useState(new Set());
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(getAuthToken())
    );
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        setIsAuthenticated(Boolean(getAuthToken()));
    }, []);

    useEffect(() => {
        const onStorage = (e) => {
            if(
                ["token", "authToken", "accessToken", "jwt"].includes(e.key) || e.key === null
            ) {
                setIsAuthenticated(Boolean(getAuthToken()));
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    useEffect(() => {
        let mounted = true;
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${API_BASE}/api/movies/${encodeURIComponent(movieIdParam)}`
                );

                const data = res?.data;
                 if(!mounted) return;
                if(!data || data.success === false) {
                toast.error((data && data.message) || "Failed to load movie");
                 setMovie(null);
               }else{
               const item = 
                data.item || 
                 data.data || 
               (data.success && data.movie) || 
                (data.success ? data : null);

                setMovie(item || null);
                   }
            } catch (err) {
                console.error("Failed to fetch movie:", err);
                toast.error("Failed to fetch movie from server");
                setMovie(null);
            }finally{
                if(mounted) setLoading(false);
            }
        };
        if(movieIdParam) fetchMovie();
        else {
            setLoading(false);
            setMovie(null);
        }
        return () => {
            mounted = false;
        };
    }, [movieIdParam]);

    const slotObj = useMemo(() => {
        if(!movie || !slotKey) return null;

        const slots = Array.isArray(movie.slots)
           ? movie.slots
           : Array.isArray(movie.showtimes)
           ? movie.showtimes
           : [];
        if(!slots.length) return null;

        const sString = slots.find(
            (s) => typeof s === "string" &&
            (s === slotKey || s === decodeURIComponent(slotKey))
        );
        if(sString) return {time: sString, audi: "Audi 1", _iso: sString };

        for(const s of slots){
            if(!s) continue;
            if(typeof s === "object") {
                const iso = slotToISO(s);
                if(!iso) continue;
                if(iso === slotKey || iso === decodeURIComponent(slotKey))
                    return { ...s, _iso: iso};
            }
        }
        try {
            const providedTs = new Date(slotKey).getTime();
            if(!isNaN(providedTs)) {
                for(const s of slots) {
                    const iso = slotToISO(s);
                    if(!iso) continue;
                    const ts = new Date(iso).getTime();
                    if(!isNaN(ts) && ts === providedTs) return { ...s, _iso: iso};
                }
            }
        } catch (e) {}
        return null;
    }, [movie, slotKey]);

    //Resolve auditorium name
    const audiName = useMemo(() => {
        if(slotObj && slotObj.auditorium && String(slotObj.auditorium).trim())
            return String(slotObj.auditorium).trim();
        if(slotObj && slotObj.audi && String(slotObj.audi).trim())
            return String(slotObj.audi).trim();
        if(movie && movie.auditorium && String(movie.auditorium).trim())
            return String(movie.auditorium).trim();
        if(movie && movie.audi && String(movie.audi).trim())
            return String(movie.audi).trim();
        if(movie && movie.hall && String(movie.hall).trim())
            return String(movie.hall).trim();
        return "Audi 1";
    }, [slotObj, movie]);

    //Validate showTime
    useEffect(() => {
        if(!slotKey) {
            toast.error("Missing showtime. Select a time from the movie page.");
            navigate(
                movie ? `/movies/${movie._id || movie.id || movieIdParam}` : "/movies"
            );
            return;
        }
        
    }, [slotKey, movie, slotObj]);

    const mid = movie ? movie._id || movie.id || movieIdParam : movieIdParam;
    const storageKey = `bookings_${mid}_${slotKey}_${audiName}`;
    const legacyKey = `bookings_${mid}_${slotKey}`;

    //fetched booked seats (paid only)
    useEffect(() => {
        let cancelled = false;

        const setBookedAndPrune = (arr) => {
            const set = new Set(arr);
            if(cancelled) return;
            setBooked((prev) => {
                const same = prev.size === set.size && [...prev].every((v) => set.has(v));
                if(same) return prev;
                
                setSelected((selPrev) => {
                    const nextSel = new Set(selPrev);
                    for(const s of set) nextSel.delete(s);
                    return nextSel;
                });
                return set;
          });
          try {
            localStorage.setItem(storageKey, JSON.stringify([...set]));
          } catch (e) {}
        };

        const fetchBooked = async () => {
            if(!movieIdParam || !slotKey) return;
            const showtimeQuery = slotObj && slotObj._iso ? slotObj._iso : slotKey;

            try {
                const token = getAuthToken();
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const res = await axios.get(`${API_BASE}/api/bookings`, {
                    params: {movieId: movieIdParam, limit: 1000},
                    headers,
                    timeout: 8000,
                });
                const data = res?.data;
                let items = [];
                if(!data) items = [];
                else if(Array.isArray(data)) items = data;
                else if(Array.isArray(data.items)) items = data.items;
                else if(Array.isArray(data.bookings)) items = data.bookings;
                else items = [];

                const paidSeats = [];
                for(const b of items) {
                    const bShowRaw = 
                      b.showtime || b.slot || b.time || b.showtimeIso || b._iso || null;
                    if(!bShowRaw) continue;
                    if(!sameMinute(bShowRaw, showtimeQuery)) continue;
                    const bAudi = (b.auditorium || b.audi || b.audiName || "").toString();
                    if( bAudi && audiName && bAudi.toLowerCase() !== audiName.toLowerCase())
                        continue;

                    const ps = (b.paymentStatus || b.payment_status || "")
                       .toString()
                       .toLowerCase();
                    if(ps !== "paid") continue;
                    const sarr = Array.isArray(b.seats)
                     ? b.seats
                       .map((s) => 
                         typeof s === "string" ? s : (s && (s.seatId || s.id)) || ""
                       ).filter(Boolean)
                     : Array.isArray(b.seatIds)
                     ? b.seatIds.map(String).filter(Boolean)
                     : [];
                    for(const s of sarr) paidSeats.push(normalizedSeatId(s));
                }

                if(!cancelled) {
                    if(paidSeats.length > 0) {
                        setBookedAndPrune(paidSeats);
                    }else{
                        setBooked(new Set());
                        try {
                            localStorage.setItem(storageKey, JSON.stringify([]));
                        } catch (e) {}
                    }
                }
                return;
            } catch (err) {
                console.warn(
                    "Primary paid-bookings fetch failed, falling back:", err?.message || err
                );
            }

            try {
                const token = getAuthToken();
                const headers = token ? {Authorization: `Bearer ${token}`} : {};
                const res2 = await axios.get(`${API_BASE}/api/bookings/occupied`, {
                    params: { movieId: mid, showtime: showtimeQuery, audi: audiName},
                    headers,
                    timeout: 8000,
                });
                const data2 = res2?.data;
                if(data2 && Array.isArray(data2.occupied)) {
                    const normalized = data2.occupied
                       .map((s) => normalizedSeatId(s))
                       .filter(Boolean);
                    if(!cancelled) setBookedAndPrune(normalized);
                    return;
                }
                throw new Error("Invalid occupied response");
            } catch (err) {
                console.warn("fetchBooked fallback failed, using local storage:", err?.message || err);
                if(cancelled) return;
                try {
                    const raw = localStorage.getItem(storageKey);
                    if(raw) {
                        const arr = JSON.parse(raw);
                        const normalized = Array.isArray(arr)
                           ? arr.map(normalizedSeatId).filter(Boolean)
                           : [];
                        setBooked(new Set(normalized));
                        return;
                    }
                    const legacyRaw = localStorage.getItem(legacyKey);
                    if(legacyRaw) {
                        const arrLegacy = JSON.parse(legacyRaw);
                        const s = new Set(
                            Array.isArray(arrLegacy) ? arrLegacy.map(normalizedSeatId) : []
                        );
                        setBooked(s);
                        try {
                            localStorage.setItem(storageKey, JSON.stringify([...s]));
                        } catch (e) {}
                        return;
                    }
                } catch (e) {
                    console.error("Fallback read failed:", e);
                }
                setBooked(new Set());
            }
        };
        
        fetchBooked();
        return () => {
            cancelled = true;
        };
    }, [movieIdParam, slotKey, audiName, slotObj]);

    useEffect(() => {
        if(!loading && !movie){
            toast.error("Movie not found.");
            navigate("/movies");
        }
    },[loading, movie, navigate]);

    const toggleSeat = (id) => {
        const nid = normalizedSeatId(id);
        if(booked.has(nid)){
            toast.error(`Seat ${nid} already booked`);
            return;
        }

       if (selected.size >= ticketCount && !selected.has(id)) {
                toast.error(`You can only select ${ticketCount} seat(s).`);
                return;
              }

        const row = nid[0];
        const num = Number(nid.slice(1));
        console.log(row, num)
        
        setSelected((prev) => {
            const next = new Set(prev);
            next.has(nid) ? next.delete(nid) : next;

            let added = 0;
            let i = 0;
            while(added < ticketCount && next.size < ticketCount){
              const seatId = `${row}${num + i}`;
              i++;

            if (booked.has(seatId) || next.has(seatId)) continue;

            next.add(seatId);
            added++;
            }
            return next;
        });
    };
    const clearSection = () => setSelected(new Set());

    //pricing - use paise to avoid rounding issues
    const basePriceRupee = 
     Number(movie?.seatPrices?.standard ?? movie?.price ?? 0) || 0;
    const standardPaise = Math.round(basePriceRupee *100);
    const reclinerRupee = typeof movie?.seatPrices?.recliner !== "undefined" && 
        movie?.seatPrices?.recliner !== null
           ? Number(movie.seatPrices.recliner)
           : null;
    const reclinerPaise = 
        reclinerRupee !== null
          ? Math.round(reclinerRupee * 100)
          : Math.round(standardPaise * 1.5);

    const confirmBooking = async () => {
        if(selected.size === 0) {
            toast.error("Select at least one seat.");
            return;
        }

        const token = getAuthToken();
        if(!token) {
            toast.error("You must be logged in to book seats.");
            const returnUrl = encodeURIComponent(
                window.location.pathname + window.location.search
            );
            setTimeout(() => {
                navigate(`/login?redirect=${returnUrl}`)
            }, 400);
            return;
        }

        const seatsArr = [...selected].sort();
        setBookingLoading(true);
        try {
            const payload = {
                movieId: movie?._id || movie?.id || movieIdParam,
                movieName: movie?.title || movie?.movieName || movie?.name || "",
                showtime: slotKey,
                auditorium: audiName,
                seats: seatsArr,
                paymentMethod: "card",
                Currency: "INR",
                email: "",
            };

            const res = await axios.post(`${API_BASE}/api/bookings`, payload, {
                headers: {Authorization: `Bearer ${token}`},
            });
            const data = res?.data;
            if(data && data.success) {
                if(data.checkout?.url) {
                    const newBooked = new Set([
                        ...booked,
                        ...seatsArr.map(normalizedSeatId),
                    ]);
                    try {
                        localStorage.setItem(storageKey, JSON.stringify([...newBooked]));
                    } catch (e) {}
                        window.location.href = data.checkout.url;
                        return; 
                }

                const newBooked = new Set([
                    ...booked,
                    ...seatsArr.map(normalizedSeatId),
                ]);
                setBooked(newBooked);
                setSelected(new Set());
                try {
                    localStorage.setItem(storageKey, JSON.stringify([...newBooked]));
                } catch (e) {}
                toast.success(
                    `${seatsArr.length} seat(s) reserved - proceed to payment`
                );
                return;
            }
            toast.error(
                (data && data.message) || "Failed to create booking on server"
            )
        } catch (err) {
            console.error(
                "confirmBooking error:",
                err?.response?.data || err.message || err
            );
            if(err?.response?.status === 401){
                toast.error("Session expired - please log in again.");
                ["token", "authToken", "accessToken", "jwt"].forEach((k) => 
                   localStorage.removeItem(k)
                );
                setIsAuthenticated(false);
                const returnUrl = encodeURIComponent(
                    window.location.pathname + window.location.search
                );
                setTimeout(() => {
                    navigate(`/login?redirect=${returnUrl}`)
                }, 400);
                return;
            }
            if(err?.response?.status === 409) {
                const occupied = err.response.data?.occupied || [];
                if(occupied.length > 0){
                    setBooked((prev) => {
                        const next = new Set(prev);
                        occupied.forEach((s) => next.add(normalizedSeatId(s)));
                        try {
                            localStorage.setItem(storageKey, JSON.stringify([...next]));
                        } catch (e) {}
                        return next;
                    });
                    setSelected((prev) => {
                        const next = new Set(prev);
                        occupied.forEach((s) => next.delete(normalizedSeatId(s)));
                        return next;
                    })
                    toast.error(
                        `Some seats were just booked by others: ${occupied.join(", ")}`
                    );
                } else {
                    toast.error(
                        err.response.data?.message || "Some seats are already booked"
                    );
                }
                return;
            }
            toast.error(err?.response?.data?.message || "Failed to create booking");
        } finally {
            setBookingLoading(false);
        }
    };

    const totalPaise = [...selected].reduce((sum, s) => {
        const rowLetter = s[0];
        const def = ROWS.find((r) => r.id === rowLetter);
        const seatPaise = def?.type === "recliner" ? reclinerPaise : standardPaise;
        return sum + (seatPaise || 0);
    }, 0);
    const total = (totalPaise / 100).toFixed(2);
    const selectedCount = selected.size;

    if (loading) {
    return (
      <div className={seatSelectorStyles.pageContainer}>
        <style>{seatSelectorStyles.customCSS}</style>
        <div className={seatSelectorStyles.mainContainer}>
          <div className="flex items-center justify-center py-32 text-gray-400 gap-3">
            <Film className="animate-pulse" size={28} />
            <span className="text-lg">Loading seats…</span>
          </div>
        </div>
      </div>
    );
}

const showtimeLabel = (() => {
    const iso = slotObj?._iso || slotKey;
    const d = new Date(iso);
    if (isNaN(d.getTime())) return slotKey;
    return d.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
})();

    const movieTitle = movie?.title || movie?.movieName || movie?.name || "Movie";

  return (
   <>
    {showTickets && 
        <div 
          className='fixed inset-0 z-50 flex justify-center items-center cursor-pointer'
          style={bgColor ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {}}
          >
            <Tickets
            ticketCount={ticketCount}
            SetTicketCount={SetTicketCount}
            showTickets={showTickets}
            setShowTickets={setShowTickets}
            />
            </div>
    }


   <div className={seatSelectorStyles.pageContainer}>
    <style>{seatSelectorStyles.customCSS}</style>
    <div className={seatSelectorStyles.mainContainer}>

      {/* Header */}
      <div className={seatSelectorStyles.headerContainer}>
        <button
          onClick={() => navigate(-1)}
          className={seatSelectorStyles.backButton}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div className={seatSelectorStyles.titleContainer}>
          <h1 className={seatSelectorStyles.movieTitle}>{movieTitle}</h1>
          <p className={seatSelectorStyles.showtimeText}>
            <Ticket size={14} />
            {audiName} • {showtimeLabel}
          </p>
        </div>

        <div style={{
            background: "linear-gradient(90deg,#ef4444,#dc2626)",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 12,
            fontWeight: 700,
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
        }}
        onClick={() => setShowTickets(true)}
        >
            Tickets: 
          <span>{ticketCount}</span>
        </div>
      </div>

      <div className={seatSelectorStyles.screenContainer}>
        <div
        className={seatSelectorStyles.screen}
        style={{
            transform: "perspective(120px) rotateX(6deg)",
            maxWidth: 900,
            boxShadow: "0 0 40px rgba(220, 38, 38, 0.18)",
        }}
        >
            <div className={seatSelectorStyles.screenText}>CURVED SCREEN</div>
            <div className={seatSelectorStyles.screenSubtext}>Please face the screen -- enjoy the show</div>
        </div>
      </div>

      {/* Main content */}
      <div className={seatSelectorStyles.mainContent}>
        <div className={seatSelectorStyles.sectionHeader}>
          <div className={seatSelectorStyles.sectionTitleContainer}>
            <h2 className={seatSelectorStyles.sectionTitle}>
              <RockingChair size={20} />
              Select Your Seats
            </h2>
            <div className={seatSelectorStyles.titleDivider} />
          </div>
        </div>

        {/* Seat grid */}
        <div className={seatSelectorStyles.seatGridContainer}>
          {ROWS.map((row) => (
            <div key={row.id} className={seatSelectorStyles.rowContainer}
              style={{marginTop: "4px"}}
            >
              <div className={seatSelectorStyles.rowHeader}
              style={{justifyContent: "space-between", marginBottom: "-36px"}}
              >
                <span className={seatSelectorStyles.rowLabel}>{row.id}</span>
                <span className={seatSelectorStyles.rowType}>{row.type}</span>
              </div>
              <div className={seatSelectorStyles.seatGrid}>
                {Array.from({ length: row.count }, (_, i) => i + 1).map((num) => {
                  const sid = seatId(row.id, num);
                  const isRecliner = row.type === "recliner";
                  const isBooked = booked.has(sid);
                  const isSelected = selected.has(sid);

                  let cls = `${seatSelectorStyles.seatButton} `;
                  if (isBooked) {
                    cls += seatSelectorStyles.seatButtonBooked;
                  } else if (isSelected) {
                    cls += isRecliner
                      ? seatSelectorStyles.seatButtonSelectedRecliner
                      : seatSelectorStyles.seatButtonSelectedStandard;
                  } else {
                    cls += isRecliner
                      ? seatSelectorStyles.seatButtonAvailableRecliner
                      : seatSelectorStyles.seatButtonAvailableStandard;
                  }

                  return (
                    <button
                      key={sid}
                      type="button"
                      disabled={isBooked}
                      onClick={() => toggleSeat(sid)}
                      className={cls}
                      title={isBooked ? `${sid} - booked` : sid}
                    >
                      <div className={seatSelectorStyles.seatContent}>
                        {isRecliner ? (
                          <Sofa className={seatSelectorStyles.seatIcon} size={16} />
                        ) : (
                          <RockingChair className={seatSelectorStyles.seatIcon} size={16} />
                        )}
                        <span className={seatSelectorStyles.seatNumber}>{num}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-green-900 inline-block" /> Available
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-gradient-to-br from-green-500 to-green-700 inline-block" /> Selected
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-gray-800 opacity-40 inline-block" /> Booked
          </div>
        </div>

        {/* Summary */}
        <div className={seatSelectorStyles.summaryGrid}>
          {/* Left: selection + actions */}
          <div className={seatSelectorStyles.summaryContainer}>
            <h3 className={seatSelectorStyles.summaryTitle}>
              <Rows size={18} />
              Your Selection
            </h3>

            {selectedCount === 0 ? (
              <div className={seatSelectorStyles.emptyState}>
                <p className={seatSelectorStyles.emptyStateTitle}>No seats selected</p>
                <p className={seatSelectorStyles.emptyStateSubtitle}>
                  Tap a seat above to select it
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={seatSelectorStyles.selectedSeatsContainer}>
                  <p className={seatSelectorStyles.selectedSeatsLabel}>
                    Selected Seats ({selectedCount})
                  </p>
                  <div className={seatSelectorStyles.selectedSeatsList}>
                    {[...selected].sort().map((s) => (
                      <span key={s} className={seatSelectorStyles.selectedSeatBadge}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={seatSelectorStyles.summaryItem}>
                  <span className={seatSelectorStyles.summaryLabel}>Tickets</span>
                  <span className={seatSelectorStyles.summaryValue}>{selectedCount}</span>
                </div>

                <div className={seatSelectorStyles.totalContainer}>
                  <div className="flex justify-between items-center">
                    <span className={seatSelectorStyles.totalLabel}>Total</span>
                    <span className={seatSelectorStyles.totalValue}>₹{total}</span>
                  </div>
                </div>
              </div>
            )}

            <div className={seatSelectorStyles.actionButtons}>
              <button
                type="button"
                onClick={clearSection}
                disabled={selectedCount === 0 || bookingLoading}
                className={seatSelectorStyles.clearButton}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={confirmBooking}
                disabled={selectedCount === 0 || bookingLoading}
                className={seatSelectorStyles.confirmButton}
              >
                <span className="flex items-center justify-center gap-2">
                  <CreditCard size={18} />
                  {bookingLoading ? "Processing…" : "Confirm & Pay"}
                </span>
              </button>
            </div>
          </div>

          {/* Right: pricing info */}
          <div className={seatSelectorStyles.pricingContainer}>
            <h3 className={seatSelectorStyles.pricingTitle}>
              <Ticket size={18} />
              Pricing
            </h3>
            <div className="space-y-3">
              <div className={seatSelectorStyles.pricingItem}>
                <div className={seatSelectorStyles.pricingRow}>
                  <span className={seatSelectorStyles.pricingLabel}>Standard</span>
                  <span className={seatSelectorStyles.pricingValueStandard}>
                    ₹{(standardPaise / 100).toFixed(2)}
                  </span>
                </div>
                <p className={seatSelectorStyles.pricingNote}>Rows A - C</p>
              </div>
              <div className={seatSelectorStyles.pricingItem}>
                <div className={seatSelectorStyles.pricingRow}>
                  <span className={seatSelectorStyles.pricingLabel}>Recliner</span>
                  <span className={seatSelectorStyles.pricingValueRecliner}>
                    ₹{(reclinerPaise / 100).toFixed(2)}
                  </span>
                </div>
                <p className={seatSelectorStyles.pricingNote}>Rows D - E</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   </>
  )
}


