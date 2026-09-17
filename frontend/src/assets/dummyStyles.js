// src/assets/dummyStyles.js
export const bannerStyles = {
  // Container styles
  container: "relative overflow-hidden min-h-[640px] h-[92svh] sm:min-h-[720px] md:min-h-[760px]",
  videoContainer: "absolute inset-0 z-0",
  video: "absolute inset-0 w-full h-full object-cover",
  overlay: "absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15",
  
  // Content styles
  content: "relative z-10 flex items-center justify-start h-full px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto",
  contentInner: "max-w-2xl mt-16 md:mt-8",
  
  // Text styles
  title: "text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.05] tracking-[-0.04em] drop-shadow-md",
  description: "text-sm sm:text-base md:text-lg text-gray-200 mb-7 max-w-xl leading-relaxed",
  
  // Rating and genre styles
  ratingGenreContainer: "flex flex-wrap items-center gap-4 mb-6",
  ratingContainer: "flex items-center mr-2",
  starsContainer: "flex",
  star: "h-4 w-4 sm:h-5 sm:w-5 text-yellow-400",
  ratingText: "ml-2 text-white text-sm sm:text-base",
  genreText: "text-gray-300 text-xs sm:text-sm",
  
  // Button styles
  buttonsContainer: "flex flex-wrap gap-3",
  bookButton: "min-h-12 bg-gradient-to-r from-red-600 to-red-500 cursor-pointer hover:from-red-700 hover:to-red-600 px-5 sm:px-7 py-3 rounded-xl flex items-center transition-all duration-200 transform hover:-translate-y-0.5 shadow-md shadow-red-950/20 text-sm sm:text-base font-semibold border border-red-400/25",
  infoButton: "min-h-12 bg-white/10 hover:bg-white/15 text-white backdrop-blur-md px-5 sm:px-7 py-3 rounded-xl flex items-center transition-all duration-200 border border-white/20 text-sm sm:text-base font-semibold",
  
  // Icon styles
  icon: "h-4 w-4 sm:h-5 sm:w-5 mr-2",
  
  // Custom CSS
  customCSS: `
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

    video { display: block; }

    @media (max-width: 420px) {
      .max-w-2xl { max-width: 92%; }
      h1 { font-size: 1.6rem; }
      p { font-size: 0.9rem; }
    }
  `
};

export const navbarStyles = {
  // Main nav container
  nav: {
    base: "fixed left-3 right-3 sm:left-5 sm:right-5 top-3 sm:top-5 z-50 transition-all duration-300 border border-white/15",
    scrolled: "py-2.5 bg-gray-950/95 backdrop-blur-xl shadow-md shadow-black/20 rounded-2xl",
    notScrolled: "py-3 bg-gray-950/85 backdrop-blur-xl shadow-md shadow-black/20 rounded-2xl"
  },

  // Layout
  container: "max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 flex items-center justify-between",
  
  // Logo section
  logoContainer: "flex items-center gap-3 z-20 flex-shrink-0",
  logoIconContainer: "bg-red-600/15 p-2.5 rounded-xl border border-red-500/40",
  logoIcon: "h-5 w-5 text-red-400",
  logoText: "text-lg md:text-base xl:text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-200 tracking-tight",

  // Desktop navigation
  desktopNav: "hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10 items-center bg-gray-900/70 backdrop-blur-md rounded-xl px-1.5 py-1.5 gap-1 border border-white/10",
  desktopNavItems: "flex gap-2 items-center",
  desktopNavItem: "flex relative group",
  desktopNavLink: {
    base: "nav-pill-btn min-h-11 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
    active: "active text-white",
    inactive: "text-gray-300"
  },
  desktopNavIcon: "h-5 w-5",

  // Right section
  rightSection: "flex items-center gap-4 z-20",

  // Tablet navigation
  tabletNav: "hidden md:flex lg:hidden items-center gap-2",
  tabletNavLink: {
    base: "nav-pill-btn flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
    active: "active bg-red-900/30 text-white shadow-lg",
    inactive: "text-gray-300 hover:bg-red-900/30"
  },
  tabletNavIcon: "h-4 w-4",
  tabletNavText: "text-xs font-semibold",

  // Auth section
  authSection: "flex items-center gap-2",
  desktopAuth: "hidden md:block",
  logoutButton: "min-h-11 flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold border border-gray-700",
  loginButton: "min-h-11 flex items-center gap-2 px-3 lg:px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-sm font-semibold shadow-sm border border-red-400/25",
  authIcon: "h-4 w-4",

  // Mobile menu
  mobileMenuToggle: "md:hidden",
  mobileMenuButton: "min-w-11 min-h-11 p-2 rounded-xl bg-gray-800 text-gray-200 hover:text-red-300 border border-gray-700 flex items-center justify-center",
  mobileMenuIcon: "h-6 w-6",
  mobileMenuPanel: "md:hidden absolute left-0 right-0 top-full mt-3 bg-gray-900/95 backdrop-blur-xl rounded-2xl p-3 shadow-lg shadow-black/20 border border-gray-700",
  mobileMenuItems: "flex flex-col gap-2",
  mobileNavLink: {
    base: "min-h-12 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
    active: "bg-gradient-to-r from-red-600 to-red-500 text-white",
    inactive: "text-gray-300 hover:bg-red-900/30"
  },
  mobileNavIcon: "h-5 w-5",
  mobileNavText: "font-medium",

  // Mobile auth
  mobileAuthSection: "pt-2 border-t border-gray-800 mt-1",
  mobileLogoutButton: "w-full mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 text-white flex items-center justify-center gap-2",
  mobileLoginButton: "w-full mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white flex items-center justify-center gap-2",
  mobileAuthIcon: "h-5 w-5"
};

// CSS styles for the style jsx block
export const navbarCSS = `
  .pill-border {
    position: absolute;
    inset: -2px;
    border-radius: 9999px;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(116,123,249,0.18), rgba(89,97,234,0.06));
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.28s ease;
  }

  .group:hover .pill-border,
  .nav-pill-btn.active + .pill-border,
  .nav-pill-btn.active ~ .pill-border {
    transform: scaleX(1);
  }

  .pill-underline {
    height: 2px;
    width: 40%;
    border-radius: 999px;
    margin-top: 4px;
    background: linear-gradient(90deg, #999fff, #5961ea);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.28s ease;
  }

  .nav-pill-btn:hover .pill-underline,
  .nav-pill-btn.active .pill-underline {
    transform: scaleX(1);
  }

  @media (max-width: 767px) {
    nav {
      left: 8px;
      right: 8px;
      top: 8px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    nav {
      left: 12px;
      right: 12px;
      top: 12px;
      border-radius: 20px !important;
      padding: 8px 0 !important;
    }
  }

  @media (min-width: 1024px) {
    .nav-pill-btn:hover {
      transform: translateY(-2px);
    }

    .nav-pill-btn.active {
      transform: translateY(-2px);
    }
  }
`;


// Add these to your existing assets/dummyStyles.js

export const bookingsPageStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-black px-4 py-6 sm:p-8 text-gray-100",
  mainContainer: "max-w-7xl pt-28 sm:pt-32 mx-auto",
  
  // Header
  header: "mb-6 flex items-center justify-between",
  title: "text-3xl md:text-4xl font-bold tracking-tight text-gray-100",
  subtitle: "text-sm text-gray-400",
  
  // Loading and error states
  loading: "py-12 text-center text-gray-400",
  error: "py-3 text-center text-red-300",
  noBookings: "col-span-full text-center text-gray-400 py-8 border border-red-800 rounded-lg",
  
  // Grid layout
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start",
  
  // Booking card
  bookingCard: "self-start bg-gray-900/85 rounded-2xl p-4 sm:p-5 border border-gray-700/80 shadow-sm shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/35 hover:shadow-md hover:shadow-black/15",
  cardContent: "flex flex-col lg:flex-row items-start gap-4",
  posterContainer: "w-full lg:w-24 h-44 lg:h-36 flex-shrink-0 overflow-hidden rounded-lg border border-gray-700",
  poster: "w-full h-full object-cover",
  cardInfo: "flex-1 w-full",
  cardHeader: "flex items-start justify-between gap-3",
  movieTitle: "text-lg font-semibold tracking-tight text-gray-100 flex items-center gap-2",
  movieIcon: "w-5 h-5",
  bookingId: "text-xs text-gray-400 mt-1",
  bookingIdText: "font-mono text-xs text-gray-200",
  category: "text-xs text-gray-400 text-right",
  
  // Movie details
  details: "mt-3 text-sm text-gray-300 flex flex-col sm:flex-row sm:items-center sm:gap-4",
  timeContainer: "flex items-center gap-2",
  timeIcon: "w-4 h-4 text-red-300",
  locationContainer: "flex items-center gap-2 mt-2 sm:mt-0",
  locationIcon: "w-4 h-4 text-red-300",
  locationText: "text-sm",
  durationLabel: "mt-3 text-xs text-gray-400",
  duration: "mt-1 text-sm text-gray-200",
  
  // Summary section
  summary: "mt-4 flex items-center justify-between gap-4",
  seatsLabel: "text-sm text-gray-400",
  total: "text-sm text-gray-300 font-semibold",
  
  // Expanded details
  expandedDetails: "mt-4 border-t border-red-900/40 pt-3 text-sm text-gray-300 space-y-3 transition-all duration-200 ease-in-out",
  expandedOpen: "max-h-[1200px] opacity-100",
  expandedClosed: "max-h-0 opacity-0 overflow-hidden",
  seatsSection: "",
  seatsLabelExpanded: "text-sm text-gray-400",
  seatsContainer: "mt-2 flex flex-wrap gap-2",
  seatItem: "px-3 py-1 rounded-md bg-black/40 border border-red-800 flex items-center gap-2 text-sm",
  seatId: "font-semibold",
  seatType: "text-xs px-2 py-0.5 rounded",
  seatTypeRecliner: "bg-red-700 text-white",
  seatTypeStandard: "bg-gray-800 text-gray-200",
  
  // Pricing breakdown
  pricing: "space-y-2",
  subtotal: "flex items-center justify-between text-gray-300",
  finalTotal: "flex items-center justify-between font-semibold text-gray-100 text-lg",
  
  // QR section
  qrSection: "flex items-center gap-4",
  qrLabel: "flex items-center gap-2 text-sm text-gray-400",
  qrIcon: "w-4 h-4",
  qrImage: "w-28 h-28 object-contain rounded-md bg-white p-1 cursor-pointer",
  qrUnavailable: "w-28 h-28 bg-gray-800 rounded-md flex items-center justify-center text-xs text-gray-500",
  
  // Toggle button
  toggleButton: "mt-4 flex items-center gap-3",
  detailsButton: "inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-red-700 bg-black/30 hover:bg-black/40 transition",
  chevron: "w-4 h-4 transform transition-transform duration-200",
  chevronOpen: "rotate-180",
  chevronClosed: "rotate-0",
  
  // Modal
  modalOverlay: "fixed inset-0 z-50 flex items-center justify-center p-4",
  modalBackdrop: "absolute inset-0 bg-black/70",
  modalContent: "relative max-w-md w-full bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl shadow-black/25 text-gray-100",
  modalHeader: "flex items-start justify-between gap-4",
  modalTitle: "text-xl font-bold text-red-400",
  modalBookingId: "text-sm text-gray-300",
  modalIdText: "font-mono text-sm",
  modalDetails: "mt-2 text-sm text-gray-300",
  modalCloseButton: "inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/30 border border-gray-700",
  modalCloseIcon: "w-4 h-4"
};

// Helper functions for formatting
export const formatTime = (d) =>
  d
    ? new Date(d).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "Time unavailable";

export const formatDuration = (mins) => {
  const h = Math.floor((mins || 0) / 60);
  const m = (mins || 0) % 60;
  return `${h}h ${m}m`;
};

// Add to src/assets/dummyStyles.js
export const contactStyles = {
  // Page container styles
  pageContainer: "min-h-screen pt-28 bg-gradient-to-b from-gray-950 to-black text-white pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden",
  
  // Background elements
  bgGradient: "absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-red-900/10 to-transparent",
  bgBlob1: "absolute top-40 right-10 w-32 h-32 bg-red-500/10 rounded-full filter blur-xl",
  bgBlob2: "absolute bottom-20 left-8 w-24 h-24 bg-red-700/10 rounded-full filter blur-xl",
  
  // Film strip effects
  filmStripTop: "absolute top-0 left-0 w-full h-4 flex gap-8",
  filmStripBottom: "absolute bottom-0 left-0 w-full h-4 flex gap-8",
  filmStripSegment: "w-8 h-4 bg-gray-800",
  
  // Content container
  contentContainer: "max-w-6xl pt-20 mx-auto relative z-10",
  
  // Header styles
  headerContainer: "text-center mb-10",
  headerTitle: "text-4xl md:text-6xl font-bold inline-flex items-baseline gap-2 tracking-[-0.035em]",
  headerTitleRed: "text-red-400",
  headerTitleWhite: "text-white",
  headerSubtitle: "text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mt-4 leading-relaxed",
  
  // Grid layout
  gridContainer: "grid grid-cols-1 lg:grid-cols-2 gap-8",
  
  // Card styles
  cardRelative: "relative",
  cardGradient: "absolute -inset-px bg-red-500/10 rounded-2xl blur-sm",
  cardContainer: "relative bg-gray-900/90 rounded-2xl p-5 sm:p-7 shadow-sm shadow-black/10 border border-gray-700/80",
  cardBadge: "absolute -top-3 left-6 bg-red-700 text-white px-3.5 py-1 rounded-lg text-xs font-semibold flex items-center tracking-wide",
  cardIcon: "h-4 w-4 mr-1",
  
  // Form styles
  formTitle: "text-xl sm:text-2xl font-semibold mb-6 text-gray-100 flex items-center pt-2 tracking-tight",
  formTitleIcon: "mr-3",
  form: "space-y-5",
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-5",
  
  // Input styles
  inputGroup: "block text-sm font-medium text-gray-300 mb-2",
  input: "w-full min-h-12 px-4 py-3 bg-gray-950/70 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 placeholder:text-gray-500",
  textarea: "w-full px-4 py-3 bg-gray-950/70 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 placeholder:text-gray-500 resize-y",
  select: "w-full min-h-12 px-4 py-3 bg-gray-950/70 border border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200",
  
  // Button styles
  submitButton: "w-full min-h-12 bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl shadow-red-950/30 cursor-pointer group",
  buttonIcon: "ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform",
  
  // Contact info styles
  contactInfo: "space-y-5",
  contactItem: "flex items-start group",
  contactIconContainer: "bg-red-600 p-2 rounded-full mr-4 transition-transform",
  contactIcon: "h-5 w-5",
  contactText: "text-lg font-semibold mb-1",
  contactDetail: "text-gray-300",
  contactSubDetail: "text-sm text-red-400 mt-1",
  
  // Emergency card styles
  emergencyCardGradient: "absolute -inset-px bg-amber-500/10 rounded-2xl blur-sm",
  emergencyCard: "relative bg-gray-900 rounded-2xl p-5 shadow-sm border border-amber-500/25",
  emergencyTitle: "text-lg font-bold mb-3 text-amber-400 flex items-center",
  emergencyIcon: "h-5 w-5 mr-2",
  emergencyText: "text-gray-300 text-sm mb-3",
  emergencyHotline: "bg-amber-600 text-white text-sm font-bold px-3 py-1 rounded-full",
  emergencyNote: "ml-3 text-xs text-amber-400"
};


// ... previous navbar styles ...

export const moviesPageStyles = {
  // Layout
  container: "min-h-screen pt-24 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white",
  
  // Categories section
  categoriesSection: "pt-12 px-4",
  categoriesContainer: "container mx-auto",
  categoriesFlex: "flex gap-2 sm:gap-3 overflow-x-auto justify-start sm:justify-center pb-2 scrollbar-hide",
  categoryButton: {
    base: "flex-shrink-0 min-h-11 px-5 py-2.5 rounded-xl cursor-pointer font-medium transition-all duration-200 border",
    active: "bg-red-600 text-white shadow-lg shadow-red-950/30 border-red-500",
    inactive: "bg-gray-900 text-gray-300 hover:bg-gray-800 border-gray-700"
  },

  // Movies grid section
  moviesSection: "py-8 px-4 pb-20",
  moviesContainer: "container mx-auto",
  moviesGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-7 sm:gap-6",
  
  // Movie card
  movieCard: "group relative cursor-pointer rounded-2xl p-2 -m-2 border border-transparent transition-all duration-200 hover:bg-gray-800/45 hover:border-white/10 focus-visible:bg-gray-800/45",
  movieImageContainer: "overflow-hidden rounded-xl aspect-[2/3] bg-gray-800 shadow-md shadow-black/15 ring-1 ring-white/10 group-hover:ring-red-400/45 transition-all duration-300",
  movieImage: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.045]",
  movieInfo: "mt-3 px-1",
  movieTitle: "font-semibold text-left truncate text-gray-100",
  movieCategory: "flex justify-start mt-1",
  movieCategoryText: "text-xs text-gray-400 capitalize",

  // Empty state
  emptyState: "col-span-full text-center text-gray-400 py-12",

  // Show more button
  showMoreContainer: "mt-8 flex justify-center",
  showMoreButton: "min-h-12 px-7 py-3 cursor-pointer rounded-xl text-white border border-red-400/25 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 hover:-translate-y-0.5 shadow-sm transition"
};

// Add to src/assets/dummyStyles.js
export const footerStyles = {
  // Main container
  footer: "relative bg-gray-950 text-white overflow-hidden border-t border-gray-800",
  
  // Animated border
  animatedBorder: "absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent",
  
  // Background elements
  bgContainer: "absolute inset-0 opacity-[0.05] pointer-events-none",
  bgGlow1: "absolute -top-12 -left-12 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-red-600 rounded-full filter blur-3xl opacity-50",
  bgGlow2: "absolute -right-16 -bottom-16 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-red-800 rounded-full filter blur-3xl opacity-40",
  
  // Floating icons
  floatingIconsContainer: "absolute inset-0 opacity-[0.035] pointer-events-none hidden md:block",
  floatingIcon: "absolute text-red-600",
  
  // Main content
  mainContainer: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16",
  gridContainer: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-9 sm:gap-10 mb-12 md:mb-14",
  
  // Brand section
  brandContainer: "lg:col-span-1",
  brandLogoContainer: "flex items-center mb-4 sm:mb-6",
  logoGlow: "absolute -inset-1 bg-red-600 rounded-xl blur opacity-20",
  logoContainer: "relative bg-red-600/15 p-2 sm:p-3 rounded-xl border border-red-500/40",
  logoIcon: "h-7 w-7 sm:h-8 sm:w-8 text-red-500",
  brandTitle: "ml-3 sm:ml-4 text-2xl sm:text-3xl font-bold text-red-400 tracking-tight",
  brandTitleWhite: "text-white",
  brandDescription: "text-gray-400 mb-6 sm:mb-8 font-light text-sm sm:text-base leading-relaxed",
  socialContainer: "flex space-x-3 sm:space-x-5",
  socialLink: "text-gray-400 p-2.5 rounded-xl transform transition-all duration-200 hover:-translate-y-0.5 hover:text-red-300 border border-gray-800 hover:border-red-500/50 hover:bg-red-600/10",
  socialIcon: "h-4 w-4 sm:h-5 sm:w-5",
  
  // Section headers
  sectionHeader: "text-base sm:text-lg font-bold mb-5 sm:mb-6 flex items-center text-gray-100",
  sectionDot: "w-2 h-2 bg-red-500 rounded-full mr-3",
  
  // Links
  linksList: "space-y-3 sm:space-y-4",
  linkItem: "text-gray-400 hover:text-red-300 transition-all duration-200 flex items-center group transform hover:translate-x-1 text-sm sm:text-base py-0.5",
  linkDot: "w-2 h-2 bg-red-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-block",
  
  // Contact info
  contactList: "space-y-4 sm:space-y-5 text-sm sm:text-base",
  contactItem: "flex items-start",
  contactIconContainer: "bg-red-600/10 p-2 rounded-lg mr-3 border border-red-500/30",
  contactIcon: "h-4 w-4 sm:h-5 sm:w-5 text-red-500",
  contactText: "text-gray-400",
  
  // Divider
  divider: "relative h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mb-8 sm:mb-10",
  dividerIconContainer: "absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-1.5 sm:p-2 rounded-full border border-red-600",
  dividerIcon: "h-5 w-5 sm:h-6 sm:w-6 text-red-500",
  
  // Bottom bar
  bottomBar: "flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0",
  designedBy: "text-sm flex items-center",
  designedByText: "text-gray-500 mr-2 text-xs sm:text-sm",
  designedByLink: "text-gray-500 font-medium hover:text-blue-500 transition-colors duration-300 text-xs sm:text-sm",
  policyLinks: "flex space-x-4 sm:space-x-6 text-xs sm:text-sm",
  policyLink: "text-gray-500 hover:text-red-500 transition-colors duration-300",
  
  // Scroll to top button
  scrollTopButton: "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 cursor-pointer bg-red-600 hover:bg-red-500 text-white p-3 rounded-xl shadow-xl shadow-black/30 transition-all duration-200 transform hover:-translate-y-0.5 z-20 group border border-red-400/50",
  scrollTopIcon: "h-5 w-5 sm:h-6 sm:w-6",
  
  // Custom CSS
  customCSS: `
    @keyframes float {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-18px) rotate(8deg);
      }
      100% {
        transform: translateY(0) rotate(0deg);
      }
    }
    .animate-float {
      will-change: transform;
    }
  `
};

// ... previous navbar and moviesPage styles ...

export const moviesStyles = {
  // Main container
  container: "px-4 py-12 sm:py-16 max-w-7xl mx-auto",
  
  // Title
  title: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-9",
  
  // Grid layout
  grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-7 sm:gap-6",
  
  // Movie article
  movieArticle: "flex flex-col items-center group rounded-2xl p-2 -m-2 border border-transparent transition-colors hover:bg-gray-800/45 hover:border-white/10",
  
  // Movie link
  movieLink: "w-full block rounded-xl overflow-hidden transform transition-all duration-300 shadow-md shadow-black/15 ring-1 ring-white/10 group-hover:ring-red-400/45",
  
  // Movie image
  movieImage: "w-full rounded-xl object-cover aspect-[2/3] h-auto transition-transform duration-500 group-hover:scale-[1.045]",
  
  // Movie info container
  movieInfo: "mt-3 text-left w-full px-1",
  
  // Title container
  titleContainer: "flex items-center justify-start gap-2",
  
  // Tickets icon
  ticketsIcon: "h-4 w-4 text-red-600",
  
  // Movie title
  movieTitle: "text-base sm:text-lg font-medium truncate",
  
  // Category container
  categoryContainer: "mt-1",
  
  // Category text
  categoryText: "text-xs sm:text-sm text-gray-400 capitalize"
};


// Add to src/assets/dummyStyles.js
export const loginStyles = {
  // Page container
  pageContainer: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-16 relative overflow-hidden",
  
  // Back button
  backButtonContainer: "mb-4 sm:mb-6 xl:mb-2 md:mb-0",
  backButton: "inline-flex items-center text-red-300 hover:text-white transition-all duration-200 group rounded-lg px-2 py-2 -ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
  backButtonIcon: "mr-2 transform group-hover:-translate-x-1 transition-transform",
  backButtonText: "font-medium text-sm sm:text-base",
  
  // Card styles
  cardContainer: "relative bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-md shadow-black/15 overflow-hidden border border-gray-700/80",
  cardHeader: "relative h-1 bg-gradient-to-r from-red-800 via-red-500 to-red-800",
  cardContent: "px-6 sm:px-9 py-8 sm:py-10",
  
  // Header section
  headerContainer: "text-center mb-6 sm:mb-8",
  headerIconContainer: "flex justify-center items-center mb-3 sm:mb-4",
  headerIcon: "text-red-500 mr-2",
  headerTitle: "text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight",
  headerSubtitle: "text-red-200 mt-1 sm:mt-2 font-medium text-sm sm:text-base",
  
  // Form styles
  formContainer: "space-y-4 sm:space-y-6",
  inputGroup: "mb-4 sm:mb-6",
  label: "block text-gray-200 text-xs font-semibold uppercase tracking-[0.12em] mb-2",
  inputContainer: "relative",
  input: "w-full min-h-12 px-4 py-3 bg-gray-950/70 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600 placeholder-gray-500",
  inputWithIcon: "w-full min-h-12 px-4 py-3 bg-gray-950/70 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200 border border-gray-700 hover:border-gray-600 pr-11",
  inputIcon: "absolute right-3 top-2.5 sm:top-3",
  passwordToggle: "absolute inset-y-0 right-0 px-2 sm:px-3 flex items-center focus:outline-none",
  passwordToggleIcon: "text-red-300",
  
  // Submit button
  submitButton: "w-full min-h-12 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-600 hover:-translate-y-0.5 transition-all cursor-pointer duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm border border-red-400/25",
  submitButtonDisabled: "opacity-80 cursor-not-allowed",
  loadingSpinner: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2",
  buttonContent: "flex items-center justify-center",
  buttonIcon: "mr-2",
  buttonText: "text-sm sm:text-base font-semibold tracking-wide",
  
  // Footer link
  footerContainer: "text-center mt-6 sm:mt-8",
  footerText: "text-gray-400 text-sm sm:text-base",
  footerLink: "text-red-400 hover:text-red-300 font-medium transition duration-200 underline hover:no-underline",
  
  // Custom CSS
  customCSS: `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

    @keyframes borderAnimation {
      0% {
        box-shadow: 0 0 0 1px #303854, 0 20px 50px rgba(0, 0, 0, 0.22);
      }
      50% {
        box-shadow: 0 0 0 1px #5961ea, 0 24px 60px rgba(18, 20, 107, 0.32);
      }
      100% {
        box-shadow: 0 0 0 1px #303854, 0 20px 50px rgba(0, 0, 0, 0.22);
      }
    }

    .animate-border {
      animation: borderAnimation 3s infinite ease-in-out;
    }

    .font-cinema {
      font-family: 'Bebas Neue', cursive;
      letter-spacing: 1px;
    }

    /* small tweak so the top/bottom film strip circles don't overcrowd on very small screens */
    @media (max-width: 420px) {
      .absolute.top-0 > div, .absolute.bottom-0 > div {
        width: 3rem;
        height: 3rem;
      }
    }
  `
};


// ... previous styles ...

export const newsStyles = {
  // Main container
  container: "min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 border-y border-gray-200",
  
  // Header section
  header: "container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6",
  headerFlex: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
  logoContainer: "flex items-center gap-4",
  logoText: "text-3xl sm:text-4xl md:text-5xl text-red-600 tracking-wider",
  logoSubtitle: "text-xs sm:text-sm text-gray-600 font-medium",
  
  // Header buttons
  headerButtons: "flex items-center gap-3 w-full sm:w-auto",
  latestNewsButton: "ml-auto inline-flex cursor-pointer bg-gradient-to-r from-red-400 to-red-500 items-center gap-2 text-white px-3 sm:px-4 py-2 rounded-full hover:shadow-lg transition",
  buttonIcon: "size-16",
  buttonText: "text-xs sm:text-sm",
  
  // Hero stripe
  heroStripe: "mt-5 sm:mt-6 flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-red-50 via-white to-red-50 p-1",
  featuredBadge: "text-xs text-red-600 font-semibold px-3 sm:px-4",
  stripeText: "flex-1 text-xs sm:text-sm text-gray-600 line-clamp-1",
  stripeIcon: "px-3 sm:px-4",
  
  // Main content
  main: "container mx-auto px-4 sm:px-6 lg:px-8 pb-12",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  
  // Hero card
  heroCard: "relative rounded-3xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md lg:col-span-2",
  heroImageContainer: "relative",
  heroImage: "h-85 sm:h-64 md:h-105 lg:h-96 xl:h-80 w-full relative",
  heroImg: "w-full h-full object-cover",
  heroOverlay: "absolute inset-0 bg-gradient-to-t from-black/75 to-transparent",
  //heroOverlay: "absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 animate-fadeIn",
  heroContent: "absolute left-5 sm:left-8 bottom-5 sm:bottom-8 right-5 sm:right-8",
  heroCategory: "inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold",
  heroTitle: "mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white",
  heroExcerpt: "mt-2 text-xs sm:text-sm md:text-base text-gray-300 max-w-full sm:max-w-3xl",
  heroMeta: "mt-4 sm:mt-6 flex flex-wrap items-center gap-3 text-gray-200",
  metaItem: "flex items-center gap-2 text-sm",
  metaIcon: "size-16",
  metaText: "text-xs sm:text-sm",
  
  // Hero card strip
  heroStrip: "p-4 sm:p-6",
  stripGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4",
  
  // Article card
  articleCard: "group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-0 shadow-sm transform transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md flex flex-col h-full",
  articleImage: "relative h-40 sm:h-36 md:h-32 w-full",
  articleImg: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]",
  articleCategory: "absolute left-3 bottom-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold",
  articleContent: "p-3 sm:p-4 flex-1 flex flex-col",
  articleTitle: "text-base sm:text-lg font-semibold",
  articleExcerpt: "mt-2 text-xs sm:text-sm text-gray-600 line-clamp-4",
  articleSpacer: "mt-auto pt-2",
  
  // Sidebar
  sidebar: "space-y-6",
  sidebarCard: "relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm transform transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md",
  sidebarCardInner: "flex items-stretch",
  sidebarImage: "w-28 sm:w-32 h-28 sm:h-32 overflow-hidden flex-shrink-0 rounded-l-2xl",
  sidebarImg: "w-full h-full object-cover",
  sidebarContent: "p-3 sm:p-4 flex-1",
  sidebarCategory: "text-xs bg-red-50 text-red-600 px-2 py-1 rounded-md font-semibold",
  sidebarTitle: "mt-2 font-semibold text-gray-900 text-sm sm:text-base",
  sidebarExcerpt: "mt-1 text-xs sm:text-sm text-gray-600 line-clamp-4",
  
  // Subscribe card
  subscribeCard: "rounded-2xl p-4 sm:p-6 bg-gradient-to-b from-white to-red-50 border border-red-100 shadow-md",
  subscribeTitle: "text-base sm:text-lg font-semibold",
  subscribeText: "mt-2 text-xs sm:text-sm text-gray-600",
  subscribeForm: "mt-3 sm:mt-4 flex gap-2",
  subscribeInput: "flex-1 min-w-0 min-h-11 px-3 sm:px-4 py-2 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-red-500 text-sm",
  subscribeButton: "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-red-600 text-white px-3 sm:px-4 py-2 rounded-xl shadow hover:bg-red-500 transition text-sm font-semibold"
};

// CSS styles for the News component
export const newsCSS = `
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @keyframes floatUp {
    0% { transform: translateY(0); opacity: 0.9; }
    50% { transform: translateY(-6px); opacity: 1; }
    100% { transform: translateY(0); opacity: 0.95; }
  }

  .animate-fadeIn {
    animation: floatUp 6s ease-in-out infinite;
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  @media (max-width: 640px) {
    header { padding-top: 1.25rem; }
    .line-clamp-4 { -webkit-line-clamp: 3; }
  }

  @media (min-width: 641px) and (max-width: 1023px) {
    .line-clamp-4 { -webkit-line-clamp: 4; }
  }
`;


// Add to src/assets/dummyStyles.js
export const releasesStyles = {
  // Page container
  pageContainer: "min-h-screen pt-28 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 sm:px-6 pb-16",
  
  // Header section
  headerContainer: "text-center mb-10 mt-6 max-w-3xl mx-auto",
  headerTitle: "font-bold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-red-300 tracking-[-0.04em]",
  headerSubtitle: "mt-4 text-xl text-gray-300",
  
  // Movie grid
  movieGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-7 sm:gap-6 max-w-7xl mx-auto",
  
  // Movie card
  movieCard: "group relative rounded-2xl p-2 -m-2 border border-transparent transition-all duration-200 hover:bg-gray-800/45 hover:border-white/10 hover:z-10",
  imageContainer: "relative overflow-hidden rounded-xl bg-gray-800 shadow-md shadow-black/15 ring-1 ring-white/10 group-hover:ring-red-400/45",
  movieImage: "w-full aspect-[2/3] h-auto object-cover transition-transform duration-500 group-hover:scale-[1.045]",
  
  // Movie info
  movieInfo: "mt-3 text-left px-1",
  movieTitle: "font-semibold text-lg truncate",
  movieCategory: "text-sm text-gray-400 mt-1"
};

// Add to src/assets/dummyStyles.js
export const seatSelectorStyles = {
  // Page container
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white px-3 py-5 sm:px-6 sm:py-8",
  
  // Main container
  mainContainer: "max-w-6xl mx-auto py-2 sm:py-4",
  
  // Header
  headerContainer: "grid grid-cols-[auto_1fr_auto] items-center mb-8 gap-2 sm:gap-4",
  backButton: "min-h-11 inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all px-3 py-2 rounded-xl hover:bg-gray-800 border border-transparent hover:border-gray-700",
  backButtonIcon: "size-6",
  titleContainer: "flex-1 text-center",
  movieTitle: "text-2xl sm:text-4xl md:text-5xl py-1 font-bold tracking-tight mb-1 text-gray-100 truncate",
  showtimeText: "text-xs sm:text-sm text-gray-400 mt-1 flex items-center justify-center gap-1.5",
  
  // Screen
  screenContainer: "mb-9 px-3 sm:px-8",
  screen: "mx-auto bg-gradient-to-b from-gray-700/70 to-gray-900 rounded-t-[2rem] shadow-sm text-center px-4 py-5 sm:p-6 relative border-x border-t border-red-400/25",
  screenText: "text-sm sm:text-base font-semibold text-gray-200 tracking-[0.18em]",
  screenSubtext: "text-xs text-gray-400 mt-1.5",
  
  
  
  // Main content
  mainContent: "bg-gray-900/70 rounded-3xl p-4 sm:p-8 border border-gray-700/70 shadow-sm shadow-black/10",
  sectionHeader: "flex justify-center mb-7",
  sectionTitleContainer: "text-center",
  sectionTitle: "text-xl sm:text-2xl text-gray-100 font-semibold mb-2 flex items-center justify-center gap-2 tracking-tight",
  titleDivider: "w-12 h-0.5 bg-red-500/70 rounded-full mx-auto",
  
  // Seat grid
  seatGridContainer: "flex flex-col items-center gap-4 sm:gap-5",
  rowContainer: "seat-row w-full max-w-4xl flex flex-col items-center",
  rowHeader: "seat-row-header w-full flex items-center justify-center mb-3",
  rowLabel: "w-10 sm:w-12 mx-1 sm:mx-2 text-sm sm:text-base font-bold text-red-300 text-center",
  rowType: "w-16 sm:w-20 px-1 text-xs font-medium text-gray-500 capitalize text-center",
  
  // Seat buttons
  seatGrid: "seat-grid",
  seatButton: "seat-btn flex items-center justify-center text-sm font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5",
  seatButtonBooked: "opacity-35 cursor-not-allowed bg-gray-900 text-gray-600 border border-gray-800",
  seatButtonSelectedStandard: "bg-blue-400 text-white shadow-sm ring-2 ring-blue-300/60 border border-green-400",
  seatButtonSelectedRecliner: "bg-blue-400 text-white shadow-sm ring-2 ring-blue-300/60 border border-green-400",
  seatButtonAvailableStandard: "bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-red-900/30 hover:border-red-500/50",
  seatButtonAvailableRecliner: "bg-gray-800/80 text-red-200 border border-gray-700 hover:bg-red-900/30 hover:border-red-500/50",
  seatContent: "flex flex-col items-center justify-center",
  seatIcon: "seat-icon",
  seatNumber: "text-xs mt-0.5 font-bold seat-num",
  
  // Booking summary
  summaryGrid: "mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start",
  summaryContainer: "lg:col-span-2 bg-gray-950/50 p-4 sm:p-6 rounded-2xl border border-gray-700/70",
  summaryTitle: "text-lg font-semibold mb-4 flex items-center gap-2 text-gray-100",
  summaryItem: "flex justify-between items-center p-3 bg-gray-900 rounded-xl border border-gray-800",
  summaryLabel: "text-gray-300",
  summaryValue: "font-bold text-red-300 text-lg",
  
  // Selected seats
  selectedSeatsContainer: "p-3 bg-gray-900 rounded-xl border border-gray-800",
  selectedSeatsLabel: "text-sm text-gray-400 mb-2",
  selectedSeatsList: "flex flex-wrap gap-2",
  selectedSeatBadge: "px-2.5 py-1 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-200 border border-green-500/25",
  
  // Total amount
  totalContainer: "p-3 bg-red-500/10 border border-red-500/20 rounded-xl",
  totalLabel: "text-gray-300 font-semibold",
  totalValue: "font-bold text-red-400 text-2xl",
  
  // Empty state
  emptyState: "text-center py-6 text-gray-500",
  emptyStateTitle: "text-lg mb-1",
  emptyStateSubtitle: "text-sm",
  
  // Action buttons
  actionButtons: "flex flex-col sm:flex-row gap-3 mt-5",
  clearButton: "min-h-12 flex-1 px-4 py-3 rounded-xl cursor-pointer bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed",
  confirmButton: "min-h-12 flex-[1.4] px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition-all cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed",
  
  // Pricing info
  pricingContainer: "bg-gray-950/50 p-4 sm:p-6 rounded-2xl border border-gray-700/70",
  pricingTitle: "text-lg font-semibold mb-4 flex items-center gap-2 text-gray-100",
  pricingItem: "p-3 rounded-xl bg-gray-900 border border-gray-800",
  pricingRow: "flex justify-between",
  pricingLabel: "text-sm text-gray-300",
  pricingValueStandard: "font-bold text-red-400",
  pricingValueRecliner: "font-bold text-red-200",
  pricingNote: "text-xs text-gray-500 mt-1",
  
  // Custom CSS
  customCSS: `
    .seat-grid {
      display: grid;
      grid-template-columns: repeat(8, 4.5rem);
      gap: .65rem;
      align-items: center;
      justify-content: center;
    }

    .seat-btn {
      width: 100%;
      height: 3.25rem;
      border-radius: .75rem;
    }

    .seat-btn > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: .15rem;
      padding: 0;
    }

    .seat-btn:focus-visible {
      outline: 3px solid #999fff;
      outline-offset: 3px;
    }

    @media (max-width: 1024px) {
      .seat-grid { grid-template-columns: repeat(8, 3.75rem); gap: .55rem; }
      .seat-btn { height: 3rem; }
    }

    @media (max-width: 640px) {
      .seat-row-header {
        justify-content: center !important;
        gap: .5rem;
        margin-bottom: .35rem !important;
      }

      .seat-grid { grid-template-columns: repeat(8, 2.25rem); gap: .35rem; }
      .seat-btn { height: 2.65rem; padding: 0 .1rem; border-radius: .55rem; }
      .seat-icon { transform: scale(.82); }
      .seat-num { font-size: .65rem; line-height: 1; }
    }

    @media (max-width: 400px) {
      .seat-grid { grid-template-columns: repeat(8, 2rem); gap: .3rem; }
      .seat-btn { height: 2.5rem; }
    }
  `
};

// ... previous styles ...

export const signUpStyles = {
  // Main container
  container: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-16 relative overflow-hidden",
  
  // Background elements
  particlesContainer: "absolute inset-0 z-0 opacity-30",
  particle: "absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-10",
  gradientOrbs: "absolute inset-0 z-0 opacity-[0.06]",
  orb1: "absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 rounded-full filter blur-3xl",
  orb2: "absolute bottom-1/3 right-1/4 w-56 h-56 bg-red-800 rounded-full filter blur-3xl",
  
  // Main content
  mainContent: "relative w-full max-w-2xl z-10",
  
  // Back button
  backButton: "absolute -top-12 left-0 cursor-pointer flex items-center text-red-300 hover:text-white transition-all duration-200 group rounded-lg px-2 py-2 -ml-2",
  backIcon: "group-hover:-translate-x-1 transition-transform",
  backText: "ml-2 text-sm font-medium",
  
  // Card
  card: "relative bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-md shadow-black/15 overflow-hidden border border-gray-700/80",
  cardHeader: "relative h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600",
  cardContent: "px-5 sm:px-8 py-7 sm:py-9",
  
  // Header
  header: "text-center mb-8",
  headerFlex: "flex justify-center items-center mb-3",
  headerIcon: "text-red-400 mr-2",
  headerTitle: "text-2xl sm:text-3xl font-bold text-white tracking-tight",
  headerSubtitle: "text-red-200 text-sm mt-1 font-medium",
  
  // Form
  form: "space-y-6",
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6",
  
  // Form fields
  field: "block text-gray-200 text-xs font-semibold uppercase tracking-[0.12em] mb-2",
  inputContainer: "relative",
  input: {
    base: "w-full min-h-12 px-4 py-3 bg-gray-950/70 text-white rounded-xl focus:ring-2 focus:outline-none transition-all duration-200 border pl-12 hover:border-gray-500",
    error: "border-red-500 focus:ring-red-500",
    normal: "border-gray-600 focus:ring-red-400"
  },
  inputWithIcon: "pl-12",
  inputWithToggle: "pl-12 pr-12",
  inputIcon: "absolute left-4 top-3.5 text-red-400",
  errorText: "text-red-400 text-xs mt-1",
  
  // Password toggle
  passwordToggle: "absolute right-4 top-3.5",
  toggleIcon: "text-red-300",
  
  // Submit button
  submitContainer: "pt-4",
  submitButton: {
    base: "w-full min-h-12 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-600 hover:-translate-y-0.5 transition-all duration-200 transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm border border-red-400/25 text-base",
    loading: "opacity-80 cursor-not-allowed"
  },
  loadingSpinner: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2",
  submitContent: "flex items-center justify-center",
  submitIcon: "mr-2",
  
  // Login link
  loginContainer: "mt-6 text-center",
  loginText: "text-gray-400 text-sm",
  loginLink: "text-red-400 hover:text-red-300 font-medium transition duration-200 underline hover:no-underline"
};

// CSS styles for the SignUp component
export const signUpCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  
  @keyframes borderAnimation {
    0% {
      box-shadow: 0 0 0 1px #303854, 0 20px 50px rgba(0, 0, 0, 0.22);
    }
    50% {
      box-shadow: 0 0 0 1px #5961ea, 0 24px 60px rgba(18, 20, 107, 0.32);
    }
    100% {
      box-shadow: 0 0 0 1px #303854, 0 20px 50px rgba(0, 0, 0, 0.22);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.2;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 0.1;
    }
  }
  
  .animate-border {
    animation: borderAnimation 3s infinite ease-in-out;
  }

  .animate-float {
    animation: float linear infinite;
  }
  
  .font-cinema {
    font-family: 'Bebas Neue', cursive;
    letter-spacing: 1px;
  }
  
  /* Custom date picker styling */
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.5) sepia(1) saturate(5) hue-rotate(320deg);
    cursor: pointer;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #1f2937;
  }

  ::-webkit-scrollbar-thumb {
    background: #dc2626;
    border-radius: 3px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
  }
`;


// ... previous styles ...

export const trailersStyles = {
  // Main container
  container: "min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900 border-y border-gray-200",
  main: "relative z-10 pt-20 pb-12 container mx-auto px-4 sm:px-6 lg:px-8",
  
  // Layout
  layout: "flex flex-col lg:flex-row md:flex-row gap-8",
  
  // Left side - Trailers List
  leftSide: "w-full md:w-1/2 lg:w-2/5",
  leftCard: "bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6",
  leftTitle: "text-2xl font-semibold mb-4 flex items-center gap-2",
  titleIcon: "text-red-600",
  
  // Carousel controls
  carouselControls: "flex items-center justify-between mb-3",
  controlButtons: "flex items-center gap-2",
  controlButton: "min-w-11 min-h-11 p-2 rounded-xl bg-gray-100 hover:bg-red-100 text-red-600 transition-colors flex items-center justify-center",
  trailerCount: "text-sm text-gray-500",
  
  // Carousel
  carousel: "flex overflow-x-auto scrollbar-hide space-x-3 pb-3 -mx-1",
  carouselItem: {
    base: "flex-none rounded-lg overflow-hidden relative cursor-pointer transition-all transform",
    active: "ring-2 ring-red-600 shadow-md scale-100",
    inactive: "hover:scale-[1.02] hover:ring-1 hover:ring-red-400"
  },
  carouselImage: "w-full h-full object-cover",
  carouselOverlay: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2",
  carouselTitle: "font-semibold text-white text-sm line-clamp-1",
  carouselGenre: "text-xs text-gray-300",
  
  // Now Trending section
  trendingSection: "mt-6 space-y-3",
  trendingTitle: "font-bold text-lg",
  trendingItem: "flex items-center space-x-3 p-2.5 rounded-xl hover:bg-red-50 cursor-pointer transition-colors",
  trendingImage: "w-14 h-14 rounded-md overflow-hidden flex-shrink-0",
  trendingImageSrc: "w-full h-full object-cover",
  trendingContent: "",
  trendingItemTitle: "font-medium text-sm",
  trendingItemGenre: "text-xs text-gray-500",
  
  // Right side - Featured Trailer
  rightSide: "w-full md:w-1/2 lg:w-3/5",
  rightCard: "bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden",
  
  // Video Player
  videoContainer: "relative",
  videoWrapper: "relative aspect-video ",
  videoIframe: "w-full h-full",
  closeButton: "absolute top-4 right-4 flex space-x-2",
  closeButtonInner: "p-2 rounded-full text-black bg-white transition-colors",
  
  // Thumbnail state
  thumbnailContainer: "relative aspect-video group bg-gray-900",
  thumbnailImage: "w-full h-full object-cover",
  playButtonContainer: "absolute inset-0 flex items-center justify-center",
  playButton: "bg-red-600 hover:bg-red-500 cursor-pointer rounded-full p-4 md:p-5 transition-all transform hover:scale-105 shadow-xl shadow-black/30",
  playIcon: "size-32 fill-white",
  
  // Trailer Info
  trailerInfo: "p-5 md:p-6",
  infoHeader: "flex flex-col md:flex-row md:items-center justify-between gap-3",
  trailerTitle: "text-2xl font-bold tracking-tight",
  trailerMeta: "flex items-center space-x-4 text-sm text-gray-700",
  metaItem: "flex items-center",
  metaIcon: "mr-1 text-red-600",
  
  // Genre tags
  genreContainer: "mt-4 flex flex-wrap gap-2",
  genreTag: "px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium",
  
  // Description
  description: "mt-4 text-gray-700",
  
  // Credits
  credits: "mt-6",
  creditsTitle: "text-2xl font-bold mb-4",
  creditsGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-start",
  creditItem: "flex flex-col items-center text-center",
  creditImage: "w-16 h-16 rounded-full overflow-hidden shadow-sm",
  creditImageSrc: "w-full h-full object-cover",
  creditName: "mt-2 text-lg font-medium",
  creditRole: "text-sm text-gray-500 capitalize"
};

// CSS styles for the Trailers component
export const trailersCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

  .font-dancing {
    font-family: 'Dancing Script', cursive;
  }

  /* Hide scrollbar cross-browser for your carousel */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* small utility to clamp trailer title lines in thumbnails */
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* gentle floating animation (kept from original) */
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  .animate-float { animation: float 8s ease-in-out infinite; }

  /* small responsive tweaks */
  @media (max-width: 640px) {
    /* shrink thumbnail cards on very small devices */
    [data-id] { width: 180px !important; min-width: 180px !important; height: 100px !important; }
  }

  @media (min-width: 641px) and (max-width: 1023px) {
    /* ensure carousel items are not too wide on tablets */
    [data-id] { width: 200px !important; min-width: 200px !important; height: 112px !important; }
  }

  /* keep lg+ desktop visual behaviors unchanged */
  @media (min-width: 1024px) {
    [data-id] { width: 220px !important; min-width: 220px !important; height: 124px !important; }
  }
`;

// Add to src/assets/dummyStyles.js
export const seatSelectorHStyles = {
  // Page container
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white px-3 py-5 sm:px-6 sm:py-8",
  
  // Main container
  mainContainer: "max-w-6xl mx-auto py-2 sm:py-4",
  
  // Header
  headerContainer: "grid grid-cols-[auto_1fr_auto] items-center mb-8 gap-2 sm:gap-4",
  backButton: "min-h-11 inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all px-3 py-2 rounded-xl hover:bg-gray-800 border border-transparent hover:border-gray-700",
  titleContainer: "flex-1 text-center",
  movieTitle: "text-2xl sm:text-4xl md:text-5xl py-1 font-bold tracking-tight mb-1 text-gray-100 truncate",
  showtimeText: "text-xs sm:text-sm text-gray-400 mt-1 flex items-center justify-center gap-1.5",
  
  // Screen
  screenContainer: "mb-9 px-3 sm:px-8",
  screen: "mx-auto bg-gradient-to-b from-gray-700/70 to-gray-900 rounded-t-[2rem] shadow-sm text-center px-4 py-5 sm:p-6 relative border-x border-t border-red-400/25",
  screenText: "text-sm sm:text-base font-semibold text-gray-200 tracking-[0.18em]",
  screenSubtext: "text-xs text-gray-400 mt-1.5",
  
  // Main content
  mainContent: "bg-gray-900/70 rounded-3xl p-4 sm:p-8 border border-gray-700/70 shadow-sm shadow-black/10",
  sectionHeader: "flex justify-center mb-7",
  sectionTitleContainer: "text-center",
  sectionTitle: "text-xl sm:text-2xl text-gray-100 font-semibold mb-2 flex items-center justify-center gap-2 tracking-tight",
  titleDivider: "w-12 h-0.5 bg-red-500/70 rounded-full mx-auto",
  
  // Seat grid
  seatGridContainer: "flex flex-col items-center gap-4 sm:gap-5 bg-gray-900/70 rounded-3xl p-4 sm:p-8 border border-gray-700/80 shadow-sm",
  rowContainer: "seat-row w-full max-w-4xl flex flex-col justify-center items-center",
  rowHeader: "seat-row-header w-full flex items-center justify-center mb-3",
  rowLabel: "w-10 sm:w-12 mx-1 sm:mx-2 text-sm sm:text-base font-bold text-red-300 text-center",
  rowType: "w-16 sm:w-20 px-1 text-xs font-medium text-gray-500 capitalize text-center",
  
  // Seat buttons
  seatGrid: "seat-grid",
  seatButton: "seat-btn flex items-center justify-center text-sm font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5",
  seatButtonBooked: "opacity-35 cursor-not-allowed bg-gray-900 text-gray-600 border border-gray-800",
  seatButtonSelectedStandard: "bg-blue-400 text-white shadow-sm ring-2 ring-blue-300/60 border border-green-400",
  seatButtonSelectedRecliner: "bg-blue-400 text-white shadow-sm ring-2 ring-blue-300/60 border border-green-400",
  seatButtonAvailableStandard: "bg-gray-800/80 text-gray-200 border border-gray-700 hover:bg-red-900/30 hover:border-red-500/50",
  seatButtonAvailableRecliner: "bg-gray-800/80 text-red-200 border border-gray-700 hover:bg-red-900/30 hover:border-red-500/50",
  seatContent: "flex flex-col items-center justify-center",
  seatIcon: "seat-icon",
  seatNumber: "text-xs mt-0.5 font-bold seat-num",
  
  // Booking summary
  summaryGrid: "mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-start",
  summaryContainer: "lg:col-span-2 bg-gray-950/50 p-4 sm:p-6 rounded-2xl border border-gray-700/70",
  summaryTitle: "text-lg font-semibold mb-4 flex items-center gap-2 text-gray-100",
  summaryItem: "flex justify-between items-center p-3 bg-gray-900 rounded-xl border border-gray-800",
  summaryLabel: "text-gray-300",
  summaryValue: "font-bold text-red-300 text-lg",
  
  // Selected seats
  selectedSeatsContainer: "p-3 bg-gray-900 rounded-xl border border-gray-800",
  selectedSeatsLabel: "text-sm text-gray-400 mb-2",
  selectedSeatsList: "flex flex-wrap gap-2",
  selectedSeatBadge: "px-2.5 py-1 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-200 border border-green-500/25",
  
  // Total amount
  totalContainer: "p-3 bg-red-500/10 border border-red-500/20 rounded-xl",
  totalLabel: "text-gray-300 font-semibold",
  totalValue: "font-bold text-red-400 text-2xl",
  
  // Empty state
  emptyState: "text-center py-6 text-gray-500",
  emptyStateTitle: "text-lg mb-1",
  emptyStateSubtitle: "text-sm",
  
  // Action buttons
  actionButtons: "flex flex-col sm:flex-row gap-3 mt-5",
  clearButton: "min-h-12 flex-1 px-4 py-3 rounded-xl cursor-pointer bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed",
  confirmButton: "min-h-12 flex-[1.4] px-4 py-3 rounded-xl cursor-pointer bg-red-600 text-white font-semibold hover:bg-red-500 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed",
  
  // Pricing info
  pricingContainer: "bg-gray-950/50 p-4 sm:p-6 rounded-2xl border border-gray-700/70",
  pricingTitle: "text-lg font-semibold mb-4 flex items-center gap-2 text-gray-100",
  pricingItem: "p-3 rounded-xl bg-gray-900 border border-gray-800",
  pricingRow: "flex justify-between",
  pricingLabel: "text-sm text-gray-300",
  pricingValueStandard: "font-bold text-red-400",
  pricingValueRecliner: "font-bold text-red-200",
  pricingNote: "text-xs text-gray-500 mt-1",
  
  // Custom CSS
  customCSS: `
    .seat-grid {
      display: grid;
      grid-template-columns: repeat(8, 4.5rem);
      gap: .65rem;
      align-items: center;
      justify-content: center;
    }

    .seat-btn {
      width: 100%;
      height: 3.25rem;
      border-radius: .75rem;
    }

    .seat-btn > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: .15rem;
      padding: 0;
    }

    .seat-btn:focus-visible {
      outline: 3px solid #999fff;
      outline-offset: 3px;
    }

    @media (max-width: 1024px) {
      .seat-grid { grid-template-columns: repeat(8, 3.75rem); gap: .55rem; }
      .seat-btn { height: 3rem; }
    }

    @media (max-width: 640px) {
      .seat-row-header {
        justify-content: center !important;
        gap: .5rem;
        margin-bottom: .35rem !important;
      }

      .seat-grid { grid-template-columns: repeat(8, 2.25rem); gap: .35rem; }
      .seat-btn { height: 2.65rem; padding: 0 .1rem; border-radius: .55rem; }
      .seat-icon { transform: scale(.82); }
      .seat-num { font-size: .65rem; line-height: 1; }
    }

    @media (max-width: 400px) {
      .seat-grid { grid-template-columns: repeat(8, 2rem); gap: .3rem; }
      .seat-btn { height: 2.5rem; }
    }
  `
};


// ... previous styles ...

export const movieDetailStyles = {
  // Main container
  container: "min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-8 px-4",
  wrapper: "max-w-7xl mx-auto",
  
  // Header
  header: "flex items-center gap-4 mb-8",
  backButton: "inline-flex items-center gap-2 text-red-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-red-900/20",
  backIcon: "size-18",
  backText: "text-sm sm:text-base",
  
  // Movie title
  titleContainer: "text-center mb-8 sm:mb-12",
  movieTitle: "text-3xl sm:text-5xl md:text-5xl lg:text-7xl py-1 font-bold tracking-wider mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
  movieMeta: "flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-base sm:text-lg text-gray-300",
  metaItem: "flex items-center gap-2",
  metaIcon: "h-4 w-4",
  ratingIcon: "text-yellow-400",
  durationIcon: "text-red-400",
  genreTag: "px-3 py-1 bg-red-900/40 rounded-full text-red-300 text-sm border border-red-700/30",
  
  // Main layout
  mainLayout: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8",
  
  // Left column - Poster
  leftColumn: "lg:col-span-1 order-1 md:order-1",
  posterCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-6 border border-gray-700/70 shadow-sm",
  posterImage: "relative overflow-hidden rounded-xl mx-auto w-full",
  posterImg: "w-full h-full object-cover rounded-xl transition-transform duration-300",
  trailerButton: "w-full mt-6 flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-base sm:text-lg transition-all shadow-lg",
  trailerIcon: "size-18",
  
  // Middle + Right columns
  rightColumns: "lg:col-span-2 order-2 md:order-2",
  
  // Showtimes section
  showtimesCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-8 border border-gray-700/70 shadow-sm mb-6",
  showtimesTitle: "text-2xl sm:text-4xl font-semibold tracking-tight mb-6 text-gray-100 text-center flex items-center justify-center gap-2",
  showtimesIcon: "h-6 w-6",
  
  // Day selection
  daySelection: "flex overflow-x-auto gap-2 mb-4 pb-2 sm:mb-8 sm:pb-0 scrollbar-hide",
  dayButton: {
    base: "flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base",
    active: "bg-red-600 text-white shadow-lg transform scale-105",
    inactive: "bg-gray-800/60 text-gray-300 hover:bg-gray-700/80"
  },
  dayName: "text-xs sm:text-sm",
  dayDate: "text-sm sm:text-base",
  
  // Showtimes grid
  showtimesGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4",
  timeButton: {
    base: "px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-lg font-semibold transition-all duration-300 border flex items-center justify-center gap-2 text-center",
    active: "bg-red-600 text-white border-red-500/50 transform scale-105",
    inactive: "bg-gray-800/40 text-gray-200 border-gray-700/50 hover:bg-red-600 hover:text-white hover:border-red-500/50"
  },
  soldOutBadge: "ml-2 px-2 py-0.5 rounded-full text-xs bg-red-700/90 text-white font-bold",
  
  // Proceed button
  proceedButton: "mt-4 sm:mt-6 text-center",
  bookButton: "px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-base sm:text-lg shadow-2xl hover:from-red-700 hover:to-red-800 transition-transform transform hover:scale-105",
  
  // Cast section
  castCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-8 border border-gray-700/70 shadow-sm",
  castTitle: "text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-red-300 text-center flex items-center justify-center gap-2",
  castIcon: "h-5 w-5",
  castGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
  castItem: "text-center group",
  castImageContainer: "relative mx-auto mb-3",
  castImage: "w-20 h-20 rounded-full object-cover mx-auto border-2 border-red-600/30 group-hover:border-red-400 transition-colors",
  castName: "font-semibold text-base sm:text-lg",
  castRole: "text-xs sm:text-sm text-gray-400",
  noCast: "text-gray-400 col-span-full text-center py-8",
  
  // Story section
  storyCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-8 border border-gray-700/70 shadow-sm mb-8",
  storyTitle: "text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-red-300 text-center",
  storyText: "text-gray-300 leading-relaxed text-base sm:text-lg text-center max-w-4xl mx-auto",
  
  // Director & Producer section
  crewGrid: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
  crewCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-8 border border-gray-700/70 shadow-sm text-center",
  crewHeader: "flex items-center justify-center gap-3 mb-4",
  crewIcon: "h-5 w-5 text-red-400",
  crewTitle: "text-xl sm:text-3xl font-bold text-red-300",
  crewContent: "flex flex-col items-center",
  crewImageGrid: "flex gap-4 sm:gap-6 items-start justify-center",
  crewImage: "w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-red-600/30 mb-3 sm:mb-4",
  crewName: "font-semibold text-base sm:text-xl",
  fallbackAvatar: "w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-700 flex items-center justify-center text-xl text-gray-300 mb-3 sm:mb-4",
  
  // Trailer modal
  modalOverlay: "fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4",
  modalContainer: "relative w-full max-w-6xl",
  closeButton: "absolute right-0 sm:-top-10 -top-6 sm:-right-4 text-white hover:text-red-400 z-10",
  closeIcon: "size-36",
  videoContainer: "w-full aspect-video rounded-xl overflow-hidden",
  videoIframe: "w-full h-full rounded-xl",
  
  // Not found state
  notFoundContainer: "min-h-screen flex items-center justify-center bg-black text-white",
  notFoundContent: "text-center",
  notFoundTitle: "text-2xl",
  notFoundLink: "mt-4 inline-block text-red-400 underline"
};

// CSS styles for the MovieDetail component
export const movieDetailCSS = `
  /* hide default scrollbar on small devices for horizontal scrollers while keeping scrolling usable */
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  
  @media (max-width: 640px) {
    /* compact title spacing on very small screens */
    h1 { line-height: 1.05; }
  }

  /* Custom font for titles */
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
`;

// Add to src/assets/dummyStyles.js
export const movieDetailHStyles = {
  // Top-level page container (used for loaded page, loading state, and not-found state)
  container: "min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-8 px-4",

  // Inner max-width wrapper
  wrapper: "max-w-7xl mx-auto",

  // Trailer modal
  modalOverlay: "fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4",
  modalContainer: "relative w-full max-w-6xl",
  closeButton: "absolute right-0 sm:-top-10 -top-6 sm:-right-4 text-white hover:text-red-400 z-10",
  videoContainer: "w-full aspect-video rounded-xl overflow-hidden",
  videoIframe: "w-full h-full rounded-xl",

  // Header
  header: "flex items-center gap-4 mb-6 sm:mb-8",
  backButton: "inline-flex items-center gap-2 text-red-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-red-900/20",
  backText: "text-sm sm:text-base",

  // Movie title
  titleContainer: "text-center mb-6 sm:mb-12",
  movieTitle: "text-2xl sm:text-4xl md:text-5xl lg:text-7xl py-1 font-bold tracking-wider mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
  movieMeta: "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-lg text-gray-300",
  metaItem: "flex items-center gap-2",
  metaIcon: "h-4 w-4",
  ratingIcon: "text-yellow-400",
  durationIcon: "text-red-400",
  genreTag: "px-3 py-1 bg-red-900/40 rounded-full text-red-300 text-xs sm:text-sm border border-red-700/30",

  // Main layout
  mainLayout: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8",
  leftColumn: "lg:col-span-1",
  rightColumns: "lg:col-span-2 flex flex-col gap-6",

  // Poster
  posterCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-6 border border-gray-700/70 shadow-sm",
  posterImage: "relative overflow-hidden rounded-xl mx-auto w-full",
  posterImg: "w-full h-full object-cover rounded-xl transition-transform duration-300",
  trailerButton: "w-full mt-5 sm:mt-6 flex items-center justify-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-sm sm:text-base transition-all shadow-lg hover:from-red-700 hover:to-red-800",

  // Showtimes card
  showtimesCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-8 border border-gray-700/70 shadow-sm",
  showtimesTitle: "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 text-gray-100 text-center flex items-center justify-center gap-2",
  showtimesIcon: "h-6 w-6",

  // Day selection — object form so `.base` gives the shared classes and
  // `.active` / `.inactive` give the state-dependent classes.
  daySelection: "flex overflow-x-auto gap-2 mb-4 pb-2 sm:mb-6 sm:pb-0 scrollbar-hide",
  dayButton: {
    base: "flex-shrink-0 px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm",
    active: "bg-red-600 text-white shadow-lg transform scale-105",
    inactive: "bg-gray-800/60 text-gray-300 hover:bg-gray-700/80",
  },
  dayName: "text-xs",
  dayDate: "text-sm sm:text-base",

  // Showtime buttons — same object pattern as dayButton
  showtimesGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4",
  timeButton: {
    base: "px-2 sm:px-3 py-2 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 border flex items-center justify-center gap-2 text-center",
    active: "bg-red-600 text-white border-red-500/50 transform scale-105",
    inactive: "bg-gray-800/40 text-gray-200 border-gray-700/50 hover:bg-red-600 hover:text-white hover:border-red-500/50",
  },
  soldOutBadge: "ml-2 px-2 py-0.5 rounded-full text-xs bg-red-700/90 text-white font-bold",

  // Proceed / book button
  proceedButton: "mt-4 sm:mt-6 text-center",
  bookButton: "px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm sm:text-base shadow-2xl hover:from-red-700 hover:to-red-800 transition-transform transform hover:scale-105",

  // Cast section
  castCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-8 border border-gray-700/70 shadow-sm",
  castTitle: "text-lg sm:text-2xl font-bold mb-4 text-red-300 text-center flex items-center justify-center gap-2",
  castIcon: "h-5 w-5",
  castGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
  castMember: "text-center group",
  castImageContainer: "relative mx-auto mb-3",
  castImage: "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto border-2 border-red-600/30 group-hover:border-red-400 transition-colors",
  castName: "font-semibold text-sm sm:text-base",
  castRole: "text-xs sm:text-sm text-gray-400",
  noCast: "text-gray-400 col-span-full text-center py-8",

  // Story section
  storyCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-8 border border-gray-700/70 shadow-sm mb-8",
  storyTitle: "text-lg sm:text-2xl md:text-3xl font-bold mb-4 text-red-300 text-center",
  storyText: "text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg text-center max-w-4xl mx-auto",

  // Director & Producer section
  crewGrid: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
  crewCard: "bg-gradient-to-br from-gray-900/90 to-gray-950 rounded-2xl p-4 sm:p-8 border border-gray-700/70 shadow-sm text-center",
  crewHeader: "flex items-center justify-center gap-3 mb-4",
  crewIcon: "h-5 w-5 text-red-400",
  crewTitle: "text-lg sm:text-2xl md:text-3xl font-bold text-red-300",
  crewContent: "flex flex-col items-center",
  crewImage: "w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-red-600/30 mb-3 sm:mb-4",
  crewName: "font-semibold text-sm sm:text-base",
  fallbackAvatar: "w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-700 flex items-center justify-center text-xl text-gray-300 mb-3 sm:mb-4",

  // Not found state
  notFoundContainer: "min-h-screen flex items-center justify-center bg-black text-white",
  notFoundContent: "text-center",
  notFoundTitle: "text-2xl",
  notFoundLink: "mt-4 inline-block text-red-400 underline",

  // Custom CSS
  customCSS: `
    /* hide default scrollbar on small devices for horizontal scrollers while keeping scrolling usable */
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }

    /* reduce title spacing on very small screens */
    @media (max-width: 420px) {
      h1 { line-height: 1.05; font-size: 1.25rem; }
    }
  `
};
