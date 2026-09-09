import React, { useEffect, useState } from 'react'
import { bookingsPageStyles, formatDuration, formatTime } from '../assets/dummyStyles'
import QRCode from 'qrcode'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {ChevronDown, Clock, Film, MapPin, QrCode, X} from 'lucide-react'


const API_BASE = import.meta.env.VITE_API_BASE;

function getStoredToken() {
  return(
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    null
  )
}

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [qrs, setQrs] = useState({});
  const [expanded, setExpanded] = useState({});
  const [scannerDetails, setScannerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function computeTotals(booking){
    if(booking.amountPaise !== undefined && booking.amountPaise !== null){
      const amt = Number(booking.amountPaise) / 100;
      return{
        subtotal: amt,
        total: amt,
        seatCount: (booking.seats || []).length || 0,
      };
    }
    if(
      booking.raw && booking.raw.amountPaise !== undefined && booking.raw.amountPaise !== null
    ){
      const amt = Number(booking.raw.amountPaise) / 100;
      return{
        subtotal: amt,
        total: amt,
        seatCount: (booking.seats || []).length || 0,
      };
    }

    if(typeof booking.amount === "number" && booking.amount > 0){
      return{
        subtotal: booking.amount,
        total: booking.amount,
        seatCount: (booking.seats || []).length || 0,
      };
    }
    if(
      booking.raw && typeof booking.raw.amount === "number" && booking.raw.amount > 0
    ){
      return{
        subtotal: booking.raw.amount,
        total: booking.raw.amount,
        seatCount: (booking.seats || []).length || 0,
      };
    }

    //fallback
    const seats = Array.isArray(booking.seats) ? booking.seats : [];
    const subtotal = seats.reduce((s, seat) => {
      if(!seat) return s;
      if(typeof seat === "object" && typeof seat.price === "number")
        return s + seat.price;

      return s;
    }, 0);
    return {subtotal, total: subtotal, seatCount: seats.length};
  }

  useEffect(() => {
    let mounted = true;
    async function fetchMyBookings() {
      setLoading(true);
      setError('');

      try {
      const token = getStoredToken();
      if(!token){
        navigate('/login');
        return;
      }  

      let res;
      try {
        res = await axios.get(`${API_BASE}/api/bookings/my`, {
          headers: {Authorization: `Bearer ${token}`},
          timeout: 15000,
        });
      } catch (err) {
        res = await axios.get(`${API_BASE}/api/bookings`, {
          headers: {Authorization: `Bearer ${token}`},
          timeout: 15000,
        });
      }
      
      const data = res?.data || {};
      let items = [];
      if(Array.isArray(data)) items = data;
      else if(Array.isArray(data.items)) items = data.items;
      else if(Array.isArray(data.bookings)) items = data.bookings;
      else if(Array.isArray(data.data)) items = data.data;
      else if(data.item && Array.isArray(data.item)) items = data.item;
      else if(data.items && Array.isArray(data.items)) items = data.items;
      else if(data && data._id) items = [data];

      const normalized = items.map((b) => {
      const id = b._id || b.id || b.bookingId || String(b.id || "");
      const movie = b.movie || {};
      const title = movie.title || movie.name || b.movieName || b.title || "Untitled";
      const poster = movie.poster || b.poster || movie.image || "";
      const category = movie.category || b.category || "";
      const durationMins = movie.durationMins ?? movie.duration ?? b.durationMins ?? 0;
      const slotTime = b.showtime || b.slotTime || b.slot || null;
      const auditorium = b.auditorium || b.audi || "Audi 1";

      const seats = Array.isArray(b.seats) && b.seats.length 
                   ? b.seats.map((s) => 
                  typeof s === "string" 
                  ? {id: s}
                  : {
                    id: s.seatId || s.id || s.name || "",
                    type: s.type,
                    price:
                    typeof s.price === "number" ? s.price : undefined,
                  }
                )
            : [];

         let amount = 0;
        if(b.amountPaise !== undefined && b.amountPaise !== null){
          amount = Number(b.amountPaise) / 100;
        }else if (typeof b.amount === "number"){
          amount = b.amount;
        }else if(typeof b.total === "number"){
          amount = b.total;
        }

        return {
          id,
          title, 
          poster,
          category,
          durationMins,
          slotTime,
          auditorium,
          seats,
          amount,
          amountPaise: b.amountPaise,
          raw: b,
        };
      });

      if(mounted) setBookings(normalized);

      } catch (err) {
        console.error("Failed to load bookings:", err);
        const status = err?.response?.status;
        if(status === 401 || status === 403){
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        if(mounted) {
          setError(
            err?.response?.data?.message ||
            err.message || "Failed to load bookings"
          );
        }
      }finally{
        if(mounted) setLoading(false);
      }
    }

    fetchMyBookings();
    return () => {
      mounted = false;
    };
  },[]);

  //QR
  useEffect(() => {
    let mounted = true;
    const makeQrs = async () => {
      const map = {};
      for(const b of bookings){
        const seatsList = (b.seats || [])
        .map((s) => (typeof s === "string" ? s : s.id || ""))
        .filter(Boolean);
      const payload = JSON.stringify({
        bookingId: b.id,
        title: b.title,
        time: formatTime(b.slotTime),
        auditorium: b.auditorium,
        seats: seatsList,
      });

      try {
        const url = await QRCode.toDataURL(payload, {
          errorCorrectionLevel: "M",
          margin: 1,
          scale: 6,
        });
        map[b.id] = {url, payload};
      } catch (err) {
        console.error("QR error for", b.id, err);
        map[b.id] = {url: "", payload};
      } 
      }
      if (mounted) setQrs(map);
      
    };
    if(bookings.length) makeQrs();
      return () => {
        mounted = false;
      };
  },[bookings]);

  const toggle = (id) =>{
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const handleQrScan = (bookingId) => {
    const entry = qrs[bookingId];
    if(!entry || !entry.payload) return;
    try {
      const parsed = JSON.parse(entry.payload);
      setExpanded((prev) => ({...prev, [bookingId]: true}));
      const el = document.getElementById(`booking-card-${bookingId}`);
      if(el && el.scrollIntoView)
        el.scrollIntoView({behavior: "smooth", block: "center"});
      setScannerDetails({bookingId, ...parsed});
    } catch (err) {
      console.error("Failed to parse QR payload", err);
    }
  }

  const closeModal = () => setScannerDetails(null);

  return (
    <div className={bookingsPageStyles.pageContainer}>
      <div className={bookingsPageStyles.mainContainer}>
        <header className={bookingsPageStyles.header}>
          <h1 className={bookingsPageStyles.title}> Your Tickets</h1>
          <div className={bookingsPageStyles.subtitle}>Present QR at entry</div>
        </header>

        {loading && (
          <div className={bookingsPageStyles.loading}>Loading Bookings...</div>
        )}

        {!loading && error && (
          <div className={bookingsPageStyles.error}>{error}</div>
        )}

        <div className={bookingsPageStyles.grid}>
          {bookings.length === 0 && !loading ? (
            <div className={bookingsPageStyles.noBookings}>No Bookings Found.</div>
          ) : (
            bookings.map((b) => {
              const totals = computeTotals(b);
              const isOpen = !!expanded[b.id];

              return (
                <article
                  id={`booking-card-${b.id}`}
                  key={b.id}
                  className={bookingsPageStyles.bookingCard}
                  aria-labelledby={`booking-${b.id}-title`}
                >
                  <div className='flex flex-col'>
                       <div>
                        <div className="flex flex-row items-start gap-6">
                    <div className={bookingsPageStyles.posterContainer}>
                      <img src={b.poster || ""} alt={b.title} className={bookingsPageStyles.poster} />
                    </div>
                    

                    <div className={bookingsPageStyles.cardInfo}>
                      <div className={bookingsPageStyles.cardHeader}>
                        <div>
                          <h2
                          id={`booking-${b.id}-title`}
                          className={bookingsPageStyles.movieTitle}
                          >
                            <Film className={bookingsPageStyles.movieIcon} />
                            <span>{b.title}</span>
                          </h2>
                          </div>
                       </div>
                          
                          <div className={bookingsPageStyles.bookingId}>
                            Booking ID:{"  "}
                            <span className={bookingsPageStyles.bookingIdText}>{b.id}</span>
                          </div>
                        </div>
                        

                        <div className={bookingsPageStyles.category}>
                          <div className='hidden lg:block'>{b.category}</div>
                        </div>
                      </div>
                      
                      <div className={bookingsPageStyles.details}>
                        <div className={bookingsPageStyles.timeContainer}>
                          <Clock className={bookingsPageStyles.timeIcon} />
                          <div>{formatTime(b.slotTime)}</div>
                        </div>

                        <div className={bookingsPageStyles.locationContainer}>
                          <MapPin className={bookingsPageStyles.locationIcon} />
                          <div className={bookingsPageStyles.locationText}>{b.auditorium}</div>
                        </div>
                      </div>

                      <div className={bookingsPageStyles.durationLabel}>
                        <div className={bookingsPageStyles.duration}>{formatDuration(b.durationMins)}</div>
                      </div>
                    </div>

                    <div className={bookingsPageStyles.summary}>
                      <div className={bookingsPageStyles.seatsLabel}>
                        Seats ({totals.seatCount})
                      </div>
                      <div className={bookingsPageStyles.total}>
                        ₹{totals.total.toLocaleString("en-IN")}
                      </div>
                    </div>

                    {isOpen && (<div className={bookingsPageStyles.qrSection}>
                      <div className={bookingsPageStyles.qrLabel}>
                        <QrCode className={bookingsPageStyles.qrIcon} />
                        <div>Ticket QR</div>
                      </div>
                      <div className='ml-auto'>
                        {qrs[b.id] && qrs[b.id].url ? (
                          <img src={qrs[b.id].url} alt={`${b.title} qr`} className={ bookingsPageStyles.qrImage}
                          role='button' tabIndex={0} onClick={ () => handleQrScan(b.id)}
                          onKeyDown={(e) => {
                            if(e.key === "Enter") handleQrScan(b.id);
                          }}
                          />
                        ) : (
                          <div className={bookingsPageStyles.qrUnavailable}>
                            QR Unavailable
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  </div>

                  <div className={bookingsPageStyles.toggleButton}>
                    <button
                    onClick={() => 
                      toggle(b.id)
                    }
                    aria-expanded= {isOpen}
                    className={bookingsPageStyles.detailsButton}
                    >
                      <span>{isOpen ? "Hide details" : "View details"}</span>
                      <ChevronDown className={`${bookingsPageStyles.chevron} ${
                        isOpen ? bookingsPageStyles.chevronOpen : bookingsPageStyles.chevronClosed
                      }`} />
                    </button>
                  </div>
                  
                </article>
              )
            })
          )}
        </div>
      </div>


      {scannerDetails && (
        <div 
        className={bookingsPageStyles.modalOverlay}
        aria-modal="true"
        role='dialog'
        >
          <div 
          className={bookingsPageStyles.modalBackdrop}
          onClick={closeModal}
          aria-hidden="true"
          />
          <div className={bookingsPageStyles.modalContent}>
            <div className={bookingsPageStyles.modalHeader}>
              <div>
                <h3 className={bookingsPageStyles.modalTitle}>
                  {scannerDetails.title}
                </h3>
                <div className={bookingsPageStyles.modalBookingId}>
                  Booking ID:{" "}
                  <span className={bookingsPageStyles.modalIdText}>{scannerDetails.bookingId}</span>
                </div>
                <div className={bookingsPageStyles.modalDetails}>
                  <div>
                    <strong>Time:</strong> {scannerDetails.time}
                  </div>
                  <div>
                    <strong>Auditorium:</strong> {scannerDetails.auditorium}
                  </div>
                  <div className='mt-2'>
                    <strong>Seats:</strong>{" "}
                    {Array.isArray(scannerDetails.seats)
                    ? scannerDetails.seats.join(", ")
                    : scannerDetails.seats
                    }
                  </div>
                </div>
              </div>

              <button 
              onClick={closeModal}
              className={bookingsPageStyles.modalCloseButton}
              aria-label='Close scanned details'
              >
                <X className={bookingsPageStyles.modalCloseIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingPage
