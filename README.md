# 🎬 CineVerse — Full-Stack Movie Booking Platform

A full-stack movie ticket booking application with a customer-facing site and a separate admin panel for managing movies, showtimes, and bookings.

## ✨ Features

### Customer Site (`frontend/`)
- Browse movies by category — Normal, Featured, Coming Soon, Latest Trailers
- View movie details, trailers, cast, and showtimes
- Seat selection and ticket booking
- User authentication (signup/login)
- Booking history

### Admin Panel (`admin/`)
- Add/edit movies with poster, cast, director, and producer uploads
- Manage showtimes and seat pricing (standard/recliner)
- View and manage bookings
- Support for multiple movie types: Normal, Featured, Coming Soon, Latest Trailers

### Backend (`backend/`)
- REST API built with Express and MongoDB
- File uploads handled via Multer
- Movie, booking, and user management endpoints

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Admin Panel:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **File Uploads:** Multer
