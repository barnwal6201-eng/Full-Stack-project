# 🎬 CineVerse — Full-Stack Movie Booking Platform

A full-stack movie ticket booking application with a customer-facing site and a separate admin panel for managing movies, showtimes, and bookings. Includes secure online payments with Stripe and cloud image storage with Cloudinary.

🔗 **Live Demo:** [movie-booking-woad.vercel.app](https://movie-booking-woad.vercel.app/)

## ✨ Features

### Customer Site (`frontend/`)
- Browse movies by category — Normal, Featured, Coming Soon, Latest Trailers
- View movie details, trailers, cast, and showtimes
- Interactive seat selection and ticket booking
- Secure online payment at checkout with Stripe
- User authentication (signup/login)
- Booking history

### Admin Panel (`admin/`)
- Add/edit movies with poster, cast, director, and producer uploads
- Manage showtimes and seat pricing (standard/recliner)
- View and manage bookings
- Support for multiple movie types: Normal, Featured, Coming Soon, Latest Trailers

### Backend (`backend/`)
- REST API built with Express and MongoDB
- Image uploads handled via Multer and stored on Cloudinary
- Stripe integration for payment handling
- Movie, booking, and user management endpoints

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Admin Panel:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Payments:** Stripe
- **File Uploads & Storage:** Multer, Cloudinary
- **Deployment:** Vercel