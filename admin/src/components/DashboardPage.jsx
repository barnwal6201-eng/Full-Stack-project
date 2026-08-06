import React, { useEffect, useState } from 'react'
import {styles3, fontStyles2} from '../assets/dummyStyles'
import axios from 'axios'

const API_BASE = 'http://localhost:5000';

const fmtINR = (num) => 
    typeof num === 'number'
    ? `₹${num.toLocaleString('en-IN', {maximumFractionDigits: 0})}`
    : '₹0';


const DashboardPage = () => {
    const [movies, setMovies] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let cancelled = false;

        async function fetchAll() {
            try {
                //requests for paid booking only

                const [mRes, bRes, uRes] = await Promise.allSettled([
                    axios.get(`${API_BASE}/api/movies`),
                    axios.get(`${API_BASE}/api/bookings`,
                    {
                        params: {paymentStatus: 'paid', limit: 1000},
                    }),
                    axios.get(`${API_BASE}/api/auth`),
                ])
                const normalizeArrayResponse = (r) => {
                    if(!r) return [];
                    if(r.status === 'rejected') return [];

                    const data = r.value?.data;
                    if(!data) return[];
                    if(Array.isArray(data)) return data;
                    if(Array.isArray(data.items)) return data.items;
                    if(Array.isArray(data.rows)) return data.rows;
                    if(Array.isArray(data.data)) return data.data;

                    if(Array.isArray(data.items)) return data.items;
                    return [];
                };

                const rawMovies = normalizeArrayResponse(mRes);
                const rawBookings = normalizeArrayResponse(bRes);
                const rawUsers = normalizeArrayResponse(uRes);

                const normMovies = rawMovies.map((m) => ({
                    id: m._id || m.id || m.movieId || m.idStr || "",
                    title: m.title || m.movieName || m.name || 'Untitled',
                    basePrice: Number(m.basePrice || m.price || m.ticketPrice || 0) || 0,
                }));

                const normBookings = rawBookings.map((b) => {
                    const movieId = b.movieId || (b.movie && (b.movie.is || b.movie._id)) || "";
                    const movieTitle = (b.movie && (b.movie.title || b.movie.movieName)) || b.movieName || b.movie || "";
                    const seats = Array.isArray(b.seats) ? b.seats.map((s) => 
                    typeof s === 'string' ? s : (s && (s.seatId || s.id)) || ""
                    ).filter(Boolean) : Array.isArray(b.seatIds)
                    ? b.seatIds.map(String).filter(Boolean) : [];

                    const totalPaid = Number(
                        b.amountPaisa !== undefined && b.amountPaisa !== null
                        ? Number(b.amountPaisa) / 100 : b.amount || b.total || 0
                    ) || 0;
                    const userId = b.userId || (b.user && (b.user._id || b.user.id)) || b.customerId || "";
                    const customer = b.customer || b.customerName || (b.user && (b.user.name || b.user.fullName)) || "";

                    return {
                        id: b._id || b.id || b.bookingId || "",
                        movieId,
                        movieTitle,
                        seats,
                        totalPaid,
                        userId,
                        customer,
                        raw: b,
                    };
                });

                //Defensive client-side  filter : ensure only paid bookings are used
                const paidBookings = normBookings.filter((bk) => {
                    const raw = bk.raw || {};
                    const ps = (
                        raw.paymentStatus || raw.payment_status || raw.paymentstate || ""
                    ).toString().toLowerCase();
                    const st = (raw.status || "").toString().toLowerCase();
                    return ps === 'paid' || st === 'paid' || Number(bk.totalPaid) > 0;
                });

                const normUsers = rawUsers.map((u) => ({
                    id: u._id || u.id || u.userId || "",
                    name: u.name || u.fullName || u.username || "",
                }));

            } catch (error) {
                
            }
        }
    })
  return (
    <div>
      
    </div>
  )
}

export default DashboardPage
