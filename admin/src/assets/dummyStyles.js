// src/assets/dummyStyles.js
// Add these to your existing assets/dummyStyles.js

export const addMoviePageStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 text-gray-100",
  mainContainer: "max-w-6xl mx-auto bg-gray-900/85 backdrop-blur-xl border border-gray-700/80 rounded-3xl p-5 sm:p-7 md:p-9 shadow-lg shadow-black/15",
  
  // Header
  header: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4",
  title: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white",
  titleIcon: "inline-block mr-2 -translate-y-1",
  
  // Form
  form: "space-y-6",
  radioContainer: "flex flex-col sm:flex-row sm:flex-wrap gap-3 lg:gap-4",
  radioLabel: "flex min-h-11 items-center gap-2 rounded-xl border border-gray-700 bg-gray-950/50 px-4 py-2 text-sm text-gray-200",
  radioInput: "accent-red-600",
  
  // Sections
  section: "bg-gray-950/45 p-4 sm:p-5 rounded-2xl border border-gray-700/80",
  sectionGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  sectionTitle: "font-semibold",
  
  // Input fields
  inputContainer: "",
  label: "block text-xs font-semibold uppercase tracking-[0.1em] text-gray-300 mb-2",
  input: "w-full min-h-12 rounded-xl p-3 bg-gray-950/70 border border-gray-700 placeholder-gray-500 outline-none hover:border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-500/25",
  textarea: "w-full rounded-xl p-3 bg-gray-950/70 border border-gray-700 outline-none hover:border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-500/25",
  numberInput: "w-32 min-h-11 rounded-xl p-2 bg-gray-950/70 border border-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/25",
  select: "w-full min-h-11 rounded-xl p-2 bg-gray-950/70 border border-gray-700 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/25",
  
  // Category buttons
  categoryContainer: "flex gap-3 flex-wrap",
  categoryButton: "min-h-10 px-4 py-2 rounded-xl border text-sm font-medium transition-colors",
  categoryButtonSelected: "bg-red-600 text-white border-red-500 shadow-sm",
  categoryButtonNormal: "bg-gray-950/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600",
  
  // File upload areas
  uploadContainer: "border border-dashed border-gray-600 rounded-2xl p-4 bg-gray-950/45 hover:border-red-400/60 transition-colors",
  uploadContent: "flex flex-col items-center justify-center gap-2 cursor-pointer",
  uploadIconContainer: "p-4 rounded-xl bg-gray-800 border border-gray-700 text-red-300",
  uploadIcon: "size-36",
  uploadText: "text-xs opacity-80",
  uploadInput: "hidden",
  
  // Preview images
  previewContainer: "relative",
  previewImage: "w-full h-48 object-contain rounded-md",
  previewThumbnail: "w-full h-40 sm:h-48 object-contain rounded-md",
  removeButton: "absolute -top-2 right-2 bg-red-700/90 p-1 rounded-full",
  removeIcon: "size-6",
  
  // Grid layouts
  gridCols1: "grid grid-cols-1 gap-4",
  gridCols2: "grid grid-cols-1 sm:grid-cols-2 gap-4",
  gridCols3: "grid grid-cols-1 sm:grid-cols-3 gap-4",
  gridCols2Md3: "sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
  
  // Duration controls
  durationContainer: "flex gap-3 flex-wrap",
  durationInput: "w-32 rounded-lg p-2 bg-black/20 border border-red-600",
  
  // Slots section
  slotsHeader: "flex items-center justify-between mb-3",
  addSlotButton: "flex items-center gap-2 px-3 py-1 rounded-full bg-red-700 text-sm",
  addSlotIcon: "",
  slotItem: "flex gap-3 items-center flex-col sm:flex-row",
  slotGrid: "flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full",
  slotInput: "p-2 rounded-lg bg-black/20 border border-gray-700 w-full",
  slotRemoveButton: "p-2 rounded-full bg-red-700",
  
  // Uploader components
  uploaderContainer: "p-3 bg-black/20 rounded-lg border border-red-700",
  uploaderHeader: "flex items-center justify-between mb-2",
  uploaderTitle: "flex items-center gap-2",
  uploaderTitleText: "font-semibold",
  uploaderAddButton: "text-xs px-3 py-1 bg-red-700 rounded-full cursor-pointer",
  uploaderAddInput: "hidden",
  uploaderGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2",
  uploaderEmpty: "col-span-1 sm:col-span-2 md:col-span-3 text-sm opacity-80",
  
  // Uploader items
  uploaderItem: "relative bg-black/30 p-2 rounded-md",
  uploaderItemImage: "w-full h-36 sm:h-40 md:h-28 object-contain rounded-md",
  uploaderItemRemove: "absolute -top-1 -right-2 bg-red-700 p-1 rounded-full",
  uploaderItemRemoveIcon: "size-6",
  uploaderItemInput: "w-full rounded-md p-1 text-sm bg-black/10 border border-gray-700",
  
  // Named uploader
  namedUploaderGrid: "grid grid-cols-1 gap-3",
  namedUploaderItem: "relative flex gap-2 items-center bg-black/30 p-2 rounded-md",
  namedUploaderImage: "w-20 h-20 object-cover rounded-md",
  namedUploaderInput: "w-full rounded-lg p-2 bg-black/20 border border-gray-700 mb-2",
  namedUploaderFileName: "text-xs opacity-80",
  
  // Form actions
  actionsContainer: "flex gap-3 justify-end flex-col sm:flex-row pt-2",
  resetButton: "min-h-12 px-5 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 w-full sm:w-auto",
  submitButton: "min-h-12 px-7 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold shadow-sm border border-red-400/25 w-full sm:w-auto",
  
  // Icon sizes
  iconSm: "size-16",
  iconMd: "size-14",
  iconLg: "size-36"
};

// Custom styles for AddMoviePage
export const addMoviePageCustomStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Dancing+Script&display=swap');
  
  .font-cinzel {
    font-family: 'Cinzel', serif;
  }
`;
// src/assets/dummyStyles.js

export const styles2 = {
  // Layout styles
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 sm:p-8 lg:p-10",
  maxWidthContainer: "max-w-6xl mx-auto",
  
  // Header styles
  headerContainer: "mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4",
  formContainer: "flex items-center gap-3 w-full lg:w-auto",
  
  // Form elements
  select: "min-h-11 px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm outline-none hover:border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-500/25",
  clearButton: "min-h-11 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-gray-700 hover:text-white",
  
  // Grid and cards
  gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
  messageContainer: "col-span-full text-center text-gray-400 py-10 border border-gray-700 rounded-2xl bg-gray-900/50",
  bookingCard: "bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/35 hover:shadow-md",
  
  // Card content
  movieIconContainer: "w-11 h-11 rounded-xl bg-red-600/15 border border-red-500/25 flex items-center justify-center text-red-300",
  movieTitle: "text-lg font-semibold tracking-tight text-gray-100",
  bookingId: "text-xs text-gray-400",
  bookingIdValue: "font-mono ml-1 text-xs text-gray-200",
  bookedByLabel: "text-xs text-gray-400 mt-1",
  bookedByValue: "text-sm font-semibold text-gray-200",
  seatsLabel: "text-xs text-gray-400",
  seatsValue: "font-semibold text-gray-200",
  
  // Details section
  detailContainer: "mt-3 text-sm text-gray-300 space-y-2",
  detailItem: "flex items-center gap-2",
  detailIcon: "w-4 h-4 text-red-400",
  auditoriumLabel: "text-xs text-gray-400 mr-2",
  auditoriumValue: "font-semibold text-gray-200",
  
  // Amount section
  amountLabel: "text-xs text-gray-400",
  amountValue: "text-lg font-bold text-gray-100"
};

// Font family style object
export const fontStyles = {
  cinzelFont: { fontFamily: "'Cinzel', serif" }
};

// src/assets/dummyStyles.js

export const styles3 = {
  // Layout styles
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 sm:p-8 lg:p-10",
  dashboardPageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8",
  maxWidthContainer: "max-w-6xl mx-auto",
  
  // Header styles
  headerContainer: "mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4",
  dashboardHeaderContainer: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
  dashboardTitle: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-100",
  dashboardSubtitle: "text-sm text-gray-400 mt-1",
  formContainer: "flex items-center gap-3 w-full lg:w-auto",
  
  // Form elements
  select: "px-3 py-2 rounded-lg bg-gray-900 border border-red-800 text-sm outline-none focus:ring-2 focus:ring-red-600",
  clearButton: "px-3 py-2 rounded-lg bg-red-700 text-white text-sm hover:brightness-95",
  
  // Summary cards
  summaryGrid: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8",
  summaryCard: "rounded-2xl border border-gray-700/80 bg-gradient-to-br from-gray-900 to-gray-950 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/30",
  summaryCardInner: "flex items-center justify-between",
  summaryLabel: "text-xs text-gray-400",
  summaryValue: "text-2xl sm:text-3xl font-bold tracking-tight text-gray-100",
  summaryBadge: "px-3 py-2 rounded-xl bg-red-600/12 border border-red-500/20 text-red-300 text-xs font-semibold",
  summaryNote: "mt-3 text-xs text-gray-500",
  
  // Movies section
  moviesSection: "rounded-2xl border border-gray-700/80 bg-gradient-to-br from-gray-900 to-gray-950 p-4 sm:p-5 shadow-sm",
  moviesHeader: "flex items-center justify-between mb-4",
  moviesTitle: "text-lg font-semibold tracking-tight text-gray-100",
  moviesCount: "text-sm text-gray-400",
  
  // Table styles
  tableContainer: "hidden lg:block overflow-x-auto",
  table: "w-full table-auto",
  tableHeader: "text-xs uppercase tracking-[0.08em] text-gray-400 text-left border-b border-gray-700",
  tableHeaderCell: "py-3 px-3 font-semibold",
  tableRow: "border-b border-gray-800 hover:bg-white/[0.03] transition-colors",
  tableMovieTitle: "font-semibold text-white",
  tableCell: "py-3 px-3 text-sm text-gray-200",
  tableEarnings: "py-3 px-3 text-sm text-red-300 font-semibold",
  tableAvg: "py-3 px-3 text-sm text-gray-300",
  tableEmpty: "py-6 text-center text-gray-500",
  
  // Mobile cards
  mobileList: "lg:hidden space-y-3",
  mobileCard: "bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700/80 rounded-xl p-4 shadow-sm",
  mobileCardInner: "flex items-start justify-between gap-3",
  mobileMovieTitle: "font-semibold text-white text-base",
  mobileLabel: "text-xs text-gray-400 mt-1",
  mobileValue: "text-gray-200 font-medium",
  mobileEarnings: "text-sm text-red-300 font-semibold",
  mobileAvgLabel: "text-xs text-gray-400 mt-1",
  mobileAvgValue: "text-gray-300",
  mobileEmpty: "text-center py-6 text-gray-500",
  
  // Grid and cards
  gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
  messageContainer: "col-span-full text-center text-gray-400 py-8 border border-red-800 rounded-lg",
  bookingCard: "bg-gradient-to-r from-gray-900 to-black border border-red-800 rounded-xl p-4 shadow-lg flex flex-col justify-between",
  
  // Card content
  movieIconContainer: "w-12 h-12 rounded-md bg-red-800 flex items-center justify-center text-white",
  movieTitle: "text-lg font-bold text-red-300",
  bookingId: "text-xs text-gray-400",
  bookingIdValue: "font-mono ml-1 text-xs text-gray-200",
  bookedByLabel: "text-xs text-gray-400 mt-1",
  bookedByValue: "text-sm font-semibold text-gray-200",
  seatsLabel: "text-xs text-gray-400",
  seatsValue: "font-semibold text-gray-200",
  
  // Details section
  detailContainer: "mt-3 text-sm text-gray-300 space-y-2",
  detailItem: "flex items-center gap-2",
  detailIcon: "w-4 h-4 text-red-400",
  auditoriumLabel: "text-xs text-gray-400 mr-2",
  auditoriumValue: "font-semibold text-gray-200",
  
  // Amount section
  amountLabel: "text-xs text-gray-400",
  amountValue: "text-lg font-bold text-red-300"
};

// Font family style object
export const fontStyles2 = {
  cinzelFont: { fontFamily: "'Cinzel', serif" }
};

// src/assets/dummyStyles.js

export const styles4 = {
  // Layout styles
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 sm:p-8 lg:p-10",
  dashboardPageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8",
  maxWidthContainer: "max-w-6xl mx-auto",
  
  // Navbar styles
  navbar: "sticky top-0 bg-gray-950/90 backdrop-blur-xl border-b border-gray-700/80 shadow-sm shadow-black/15 relative z-40",
  navbarContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  navbarFlex: "flex items-center justify-between h-16",
  logoContainer: "flex items-center space-x-3",
  logoIcon: "flex items-center justify-center w-10 h-10 bg-red-600/15 border border-red-500/30 rounded-xl transition-colors duration-200",
  logoIconInner: "w-5 h-5 text-red-300",
  logoText: "text-xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white to-red-200 bg-clip-text",
  desktopNav: "hidden lg:flex lg:space-x-4",
  mobileMenuButton: "inline-flex items-center justify-center p-2 rounded-md text-red-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600",
  mobileMenuIcon: "w-6 h-6",
  
  // Navigation links
  navLinkBase: "group flex min-h-11 items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-200",
  navLinkActive: "bg-red-600 text-white border-red-500/50 shadow-sm",
  navLinkInactive: "bg-transparent border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-700",
  navLinkIconBase: "w-5 h-5 transition-colors",
  navLinkIconActive: "text-white",
  navLinkIconInactive: "text-red-400 group-hover:text-red-300",
  navLinkTextBase: "text-sm font-semibold tracking-normal transition-colors",
  navLinkTextActive: "text-white",
  navLinkTextInactive: "text-white group-hover:text-red-200",
  
  // Mobile menu
  mobileMenuContainer: "fixed inset-0 z-50 transition-all duration-300",
  mobileMenuBackdrop: "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
  mobileMenuPanel: "fixed top-0 right-0 h-full w-72 max-w-full bg-gradient-to-b from-gray-950 to-gray-900 border-l border-gray-700 shadow-xl transform transition-transform duration-300 lg:hidden",
  mobileMenuPanelHeader: "flex items-center justify-between px-4 py-4 border-b border-gray-700",
  mobileMenuPanelNav: "px-4 py-6 space-y-3",
  mobileMenuPanelFooter: "absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700",
  mobileMenuFooterText: "text-xs text-red-300",
  
  // Mobile navigation links
  mobileNavLinkBase: "flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors",
  mobileNavLinkActive: "bg-red-700 text-white shadow-md",
  mobileNavLinkInactive: "hover:bg-white/5 text-red-200",
  mobileNavLinkIconBase: "w-5 h-5",
  mobileNavLinkIconActive: "text-white",
  mobileNavLinkIconInactive: "text-red-300",
  mobileNavLinkText: "font-semibold",
  
  // Header styles
  headerContainer: "mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4",
  dashboardHeaderContainer: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
  dashboardTitle: "text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-500",
  dashboardSubtitle: "text-sm text-gray-400 mt-1",
  formContainer: "flex items-center gap-3 w-full lg:w-auto",
  
  // Form elements
  select: "px-3 py-2 rounded-lg bg-gray-900 border border-red-800 text-sm outline-none focus:ring-2 focus:ring-red-600",
  clearButton: "px-3 py-2 rounded-lg bg-red-700 text-white text-sm hover:brightness-95",
  
  // Summary cards
  summaryGrid: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8",
  summaryCard: "rounded-2xl border border-red-800 bg-gradient-to-b from-gray-900/60 to-black p-4 shadow-lg",
  summaryCardInner: "flex items-center justify-between",
  summaryLabel: "text-xs text-gray-400",
  summaryValue: "text-2xl sm:text-3xl font-bold text-red-400",
  summaryBadge: "px-3 py-2 rounded-lg bg-red-800/20 text-red-300 text-sm font-medium",
  summaryNote: "mt-3 text-xs text-gray-500",
  
  // Movies section
  moviesSection: "rounded-2xl border border-red-800 bg-gradient-to-b from-gray-900 to-black p-4 shadow-inner",
  moviesHeader: "flex items-center justify-between mb-4",
  moviesTitle: "text-lg font-semibold text-red-400",
  moviesCount: "text-sm text-gray-400",
  
  // Table styles
  tableContainer: "hidden lg:block overflow-x-auto",
  table: "w-full table-auto",
  tableHeader: "text-xs text-gray-400 text-left border-b border-red-900/30",
  tableHeaderCell: "py-2 px-3",
  tableRow: "border-b border-red-900/20 hover:bg-white/2 transition-colors",
  tableMovieTitle: "font-semibold text-white",
  tableCell: "py-3 px-3 text-sm text-gray-200",
  tableEarnings: "py-3 px-3 text-sm text-red-300 font-semibold",
  tableAvg: "py-3 px-3 text-sm text-gray-300",
  tableEmpty: "py-6 text-center text-gray-500",
  
  // Mobile cards
  mobileList: "lg:hidden space-y-3",
  mobileCard: "bg-gradient-to-b from-gray-900/70 to-black border border-red-800 rounded-xl p-4 shadow-sm",
  mobileCardInner: "flex items-start justify-between gap-3",
  mobileMovieTitle: "font-semibold text-white text-base",
  mobileLabel: "text-xs text-gray-400 mt-1",
  mobileValue: "text-gray-200 font-medium",
  mobileEarnings: "text-sm text-red-300 font-semibold",
  mobileAvgLabel: "text-xs text-gray-400 mt-1",
  mobileAvgValue: "text-gray-300",
  mobileEmpty: "text-center py-6 text-gray-500",
  
  // Grid and cards
  gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
  messageContainer: "col-span-full text-center text-gray-400 py-8 border border-red-800 rounded-lg",
  bookingCard: "bg-gradient-to-r from-gray-900 to-black border border-red-800 rounded-xl p-4 shadow-lg flex flex-col justify-between",
  
  // Card content
  movieIconContainer: "w-12 h-12 rounded-md bg-red-800 flex items-center justify-center text-white",
  movieTitle: "text-lg font-bold text-red-300",
  bookingId: "text-xs text-gray-400",
  bookingIdValue: "font-mono ml-1 text-xs text-gray-200",
  bookedByLabel: "text-xs text-gray-400 mt-1",
  bookedByValue: "text-sm font-semibold text-gray-200",
  seatsLabel: "text-xs text-gray-400",
  seatsValue: "font-semibold text-gray-200",
  
  // Details section
  detailContainer: "mt-3 text-sm text-gray-300 space-y-2",
  detailItem: "flex items-center gap-2",
  detailIcon: "w-4 h-4 text-red-400",
  auditoriumLabel: "text-xs text-gray-400 mr-2",
  auditoriumValue: "font-semibold text-gray-200",
  
  // Amount section
  amountLabel: "text-xs text-gray-400",
  amountValue: "text-lg font-bold text-red-300"
};


// src/assets/dummyStyles.js

export const styles5 = {
  // Layout styles
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 sm:p-8 lg:p-10",
  dashboardPageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8",
  listMoviesContainer: "min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-950 via-gray-950 to-gray-900 text-gray-100",
  maxWidthContainer: "max-w-6xl mx-auto",
  maxWidth7xl: "max-w-7xl mx-auto",
  
  // Navbar styles
  navbar: "sticky top-0 bg-gray-950/90 backdrop-blur-xl border-b border-gray-700/80 shadow-sm shadow-black/15 relative z-40",
  navbarContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  navbarFlex: "flex items-center justify-between h-16",
  logoContainer: "flex items-center space-x-3",
  logoIcon: "flex items-center justify-center w-10 h-10 bg-red-600/15 border border-red-500/30 rounded-xl transition-colors duration-200",
  logoIconInner: "w-5 h-5 text-red-300",
  logoText: "text-xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white to-red-200 bg-clip-text",
  desktopNav: "hidden lg:flex lg:space-x-4",
  mobileMenuButton: "inline-flex items-center justify-center p-2 rounded-md text-red-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600",
  mobileMenuIcon: "w-6 h-6",
  
  // List Movies Header
  listMoviesHeader: "mb-8",
  listMoviesHeaderInner: "flex flex-col lg:flex-row items-center justify-between gap-6 mb-6",
  listMoviesTitle: "text-2xl lg:text-3xl font-bold tracking-tight text-white",
  listMoviesSubtitle: "text-sm text-gray-400 mt-1",
  searchContainer: "w-full flex items-center justify-center lg:justify-end mt-4 lg:mt-0",
  searchBox: "relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-[540px] mx-auto lg:mx-0",
  searchInput: "w-full min-h-12 px-12 py-3 rounded-xl text-sm sm:text-base bg-gray-900/80 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/25 focus:border-red-400 backdrop-blur-sm",
  searchIcon: "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400",
  
  // Filter Tabs
  filterContainer: "flex flex-wrap gap-3 justify-center md:justify-start",
  filterButton: "filter-btn flex min-h-11 items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm border transition-all duration-200 cursor-pointer",
  filterButtonActive: "bg-red-600 border-red-500/50 text-white shadow-sm",
  filterButtonInactive: "bg-gray-900/60 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600",
  
  // Main Grid
  mainGrid: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8",
  leftColumn: "md:col-span-2 lg:col-span-2",
  rightColumn: "md:col-span-1 lg:col-span-2",
  cardsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-6",
  
  // Error and Loading States
  errorContainer: "col-span-full p-6 text-center text-red-300 rounded-2xl gradient-border",
  errorMessage: "font-semibold",
  errorRetryButton: "px-4 py-2 bg-red-700 rounded-lg",
  emptyState: "col-span-full p-8 text-center gradient-border rounded-2xl",
  emptyStateText: "text-gray-400 text-lg",
  emptyStateSubtext: "text-gray-500 text-sm mt-2",
  loadingState: "col-span-full p-6 text-center gradient-border rounded-2xl",
  loadingText: "text-gray-400",
  
  // Card Styles
  card: "card-hover flex h-full min-h-[520px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-700/70 bg-gray-900/90 shadow-sm group",
  cardMedia: "relative h-60 overflow-hidden bg-gray-950 sm:h-64",
  cardImageBackdrop: "absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl transition-transform duration-500 group-hover:scale-[1.14]",
  cardImageOverlay: "pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-gray-950/45 via-transparent to-black/10",
  cardDeleteButton: "absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-xl border border-white/10 bg-gray-950/75 text-gray-300 backdrop-blur-md transition-all hover:border-red-400/40 hover:bg-red-600 hover:text-white focus-visible:outline-none",
  cardImage: "relative z-[1] h-full w-full object-contain object-center p-3 transition-transform duration-500 ease-out group-hover:scale-[1.015]",
  cardContent: "flex flex-1 flex-col p-5",
  cardHeader: "mb-3 min-w-0",
  cardTitle: "line-clamp-2 min-h-[48px] text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-red-200",
  cardCategories: "mt-3 flex min-h-6 flex-wrap gap-1.5",
  cardCategory: "rounded-full border border-gray-700 bg-gray-800/80 px-2.5 py-1 text-[11px] font-medium leading-none text-gray-300",
  cardRatingContainer: "mb-4 flex min-h-7 flex-wrap items-center gap-2",
  cardRating: "flex items-center gap-1.5 rounded-lg border border-yellow-400/15 bg-yellow-400/10 px-2.5 py-1 text-sm",
  cardRatingIcon: "text-yellow-400",
  cardRatingText: "text-sm font-semibold text-yellow-300",
  cardDuration: "flex items-center gap-1.5 rounded-lg border border-red-400/15 bg-red-500/10 px-2.5 py-1 text-sm",
  cardDurationIcon: "text-red-300",
  cardDurationText: "text-sm font-medium text-gray-300",
  cardDescription: "mb-5 line-clamp-3 min-h-[63px] text-sm leading-5 text-gray-400",
  cardActions: "mt-auto flex items-center gap-2 border-t border-gray-800 pt-4",
  cardViewButton: "flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-500",
  cardTrailerButton: "flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-800 px-3.5 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-red-400/35 hover:bg-gray-700 hover:text-white",
  cardTrailerIcon: "h-4 w-4 text-red-300",
  
  // Detail View Sidebar
  detailSidebar: "md:sticky md:top-6 lg:top-6 bg-gray-900/75 border border-gray-700/80 rounded-2xl p-5 md:p-6 shadow-sm backdrop-blur-sm max-h-[auto] md:max-h-[75vh] lg:h-[85vh] overflow-y-auto",
  detailHeader: "flex items-center justify-between mb-4",
  detailTitle: "text-lg md:text-xl font-bold text-white",
  detailLiveIndicator: "flex items-center gap-2",
  detailLiveDot: "w-2 h-2 bg-red-500 rounded-full animate-pulse",
  detailLiveText: "text-xs text-gray-400",
  detailEmptyState: "flex flex-col items-center justify-center text-center py-12 md:py-16",
  detailEmptyIcon: "p-6 bg-gray-900/30 rounded-3xl border border-gray-700 backdrop-blur-sm",
  detailEmptyText: "text-gray-400 text-base mb-2",
  detailEmptySubtext: "text-gray-500 text-sm",
  
  // Detail View Content
  detailContainer: "space-y-6",
  detailHeaderContainer: "flex justify-between items-start gap-4 mb-2",
  detailTypeIndicator: "flex items-center gap-3 mb-3",
  detailTypeDot: "w-4 h-4 rounded-full bg-gradient-to-r",
  detailTypeText: "text-sm font-semibold text-gray-400 uppercase tracking-wide",
  detailContentTitle: "text-xl md:text-2xl font-bold text-white leading-tight",
  detailCloseButton: "flex-shrink-0 p-2.5 gradient-border rounded-xl text-gray-400 hover:text-white hover:border-red-500/60 transition-all duration-300 cursor-pointer",
  
  // Detail Sections
  detailThumbnail: "rounded-2xl overflow-hidden gradient-border",
  detailThumbnailImage: "w-full h-56 object-contain",
  detailGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 gradient-border rounded-2xl",
  detailGridItem: "space-y-2",
  detailGridLabel: "text-gray-400 text-sm uppercase font-semibold",
  detailGridValue: "text-white font-medium",
  detailRatingValue: "flex items-center gap-2 text-yellow-400 font-bold",
  detailDescription: "space-y-3",
  descriptionLabel: "text-gray-400 text-sm uppercase font-semibold",
  descriptionText: "text-gray-300 leading-relaxed text-base",
  watchTrailerButton: "flex min-h-12 items-center justify-center gap-3 w-full py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-xl text-white font-semibold hover:from-red-700 hover:to-red-600 transition-all duration-200 cursor-pointer shadow-sm",
  
  // Movie Details
  detailPoster: "w-full h-72 object-contain",
  detailInfoGrid: "grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 sm:p-5 gradient-border rounded-2xl",
  detailInfoItem: "space-y-1",
  detailInfoLabel: "text-gray-400 text-sm uppercase font-semibold",
  detailInfoValue: "text-white font-medium text-lg",
  seatPrice: "text-green-400 font-bold text-lg",
  storySection: "space-y-3",
  storyLabel: "flex items-center gap-3",
  storyDot: "w-1.5 h-6 bg-red-500 rounded-full",
  storyText: "text-gray-300 leading-relaxed text-base",
  
  // Showtimes
  showtimesSection: "space-y-4",
  showtimesHeader: "flex items-center gap-3",
  showtimesIcon: "text-red-400",
  showtimesList: "space-y-3",
  showtimeItem: "flex items-center justify-between p-4 gradient-border rounded-2xl hover:border-red-500/60 transition-all duration-300 cursor-pointer",
  showtimeText: "text-white font-medium",
  showtimeStatus: "flex items-center gap-2",
  showtimeDot: "w-2 h-2 bg-green-500 rounded-full animate-pulse",
  showtimeStatusText: "text-green-400 text-xs font-semibold",
  
  // Release Soon
  releaseSoonContainer: "text-center space-y-6 py-8",
  releaseSoonImage: "rounded-2xl overflow-hidden gradient-border mx-auto max-w-sm transform transition-transform duration-500",
  releaseSoonText: "text-gray-400 text-lg font-semibold",
  releaseSoonCategories: "flex justify-center gap-3",
  releaseSoonCategory: "px-4 py-2 bg-gray-700/50 rounded-full text-sm text-gray-300 border border-gray-600 font-medium",
  releaseSoonMessage: "text-gray-500 text-sm mt-4",
  
  // Person Grid
  personGrid: "mt-6",
  personHeader: "flex items-center gap-3 mb-4",
  personDot: "w-1.5 h-6 bg-red-500 rounded-full",
  personTitle: "font-bold text-white text-lg",
  personList: "flex gap-4 overflow-x-auto pb-4 scrollbar-thin",
  personItem: "flex-shrink-0 text-center group cursor-pointer",
  personAvatar: "w-20 h-20 object-cover rounded-2xl mb-3 mx-auto border-2 border-gray-600 group-hover:border-red-500 transition-all duration-300 group-hover:scale-105",
  personName: "font-semibold text-sm text-white truncate max-w-[100px] mx-auto",
  personRole: "text-gray-400 text-xs mt-1 px-2 py-1 bg-gray-700/50 rounded-full",
  
  // Navigation links
  navLinkBase: "group flex items-center space-x-2 px-4 py-2 rounded-full border border-red-800 transition-all duration-300 transform",
  navLinkActive: "bg-red-700 hover:from-red-800 scale-105 shadow-lg shadow-red-900/50",
  navLinkInactive: "bg-gradient-to-r from-red-900 to-black hover:from-red-800 hover:to-black",
  navLinkIconBase: "w-5 h-5 transition-colors",
  navLinkIconActive: "text-white",
  navLinkIconInactive: "text-red-400 group-hover:text-red-300",
  navLinkTextBase: "font-['Arial_Black'] text-sm tracking-wide transition-colors",
  navLinkTextActive: "text-white",
  navLinkTextInactive: "text-white group-hover:text-red-200",
  
  // Mobile menu
  mobileMenuContainer: "fixed inset-0 z-50 transition-all duration-300",
  mobileMenuBackdrop: "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
  mobileMenuPanel: "fixed top-0 right-0 h-full w-72 max-w-full bg-gradient-to-b from-black/95 to-black/90 border-l border-red-800 shadow-2xl transform transition-transform duration-300 lg:hidden",
  mobileMenuPanelHeader: "flex items-center justify-between px-4 py-4 border-b border-red-800",
  mobileMenuPanelNav: "px-4 py-6 space-y-3",
  mobileMenuPanelFooter: "absolute bottom-0 left-0 right-0 p-4 border-t border-red-800",
  mobileMenuFooterText: "text-xs text-red-300",
  
  // Mobile navigation links
  mobileNavLinkBase: "flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors",
  mobileNavLinkActive: "bg-red-700 text-white shadow-md",
  mobileNavLinkInactive: "hover:bg-white/5 text-red-200",
  mobileNavLinkIconBase: "w-5 h-5",
  mobileNavLinkIconActive: "text-white",
  mobileNavLinkIconInactive: "text-red-300",
  mobileNavLinkText: "font-semibold",
  
  // Header styles
  headerContainer: "mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4",
  dashboardHeaderContainer: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
  dashboardTitle: "text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-500",
  dashboardSubtitle: "text-sm text-gray-400 mt-1",
  formContainer: "flex items-center gap-3 w-full lg:w-auto",
  
  // Form elements
  select: "px-3 py-2 rounded-lg bg-gray-900 border border-red-800 text-sm outline-none focus:ring-2 focus:ring-red-600",
  clearButton: "px-3 py-2 rounded-lg bg-red-700 text-white text-sm hover:brightness-95",
  
  // Summary cards
  summaryGrid: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8",
  summaryCard: "rounded-2xl border border-red-800 bg-gradient-to-b from-gray-900/60 to-black p-4 shadow-lg",
  summaryCardInner: "flex items-center justify-between",
  summaryLabel: "text-xs text-gray-400",
  summaryValue: "text-2xl sm:text-3xl font-bold text-red-400",
  summaryBadge: "px-3 py-2 rounded-lg bg-red-800/20 text-red-300 text-sm font-medium",
  summaryNote: "mt-3 text-xs text-gray-500",
  
  // Movies section
  moviesSection: "rounded-2xl border border-red-800 bg-gradient-to-b from-gray-900 to-black p-4 shadow-inner",
  moviesHeader: "flex items-center justify-between mb-4",
  moviesTitle: "text-lg font-semibold text-red-400",
  moviesCount: "text-sm text-gray-400",
  
  // Table styles
  tableContainer: "hidden lg:block overflow-x-auto",
  table: "w-full table-auto",
  tableHeader: "text-xs text-gray-400 text-left border-b border-red-900/30",
  tableHeaderCell: "py-2 px-3",
  tableRow: "border-b border-red-900/20 hover:bg-white/2 transition-colors",
  tableMovieTitle: "font-semibold text-white",
  tableCell: "py-3 px-3 text-sm text-gray-200",
  tableEarnings: "py-3 px-3 text-sm text-red-300 font-semibold",
  tableAvg: "py-3 px-3 text-sm text-gray-300",
  tableEmpty: "py-6 text-center text-gray-500",
  
  // Mobile cards
  mobileList: "lg:hidden space-y-3",
  mobileCard: "bg-gradient-to-b from-gray-900/70 to-black border border-red-800 rounded-xl p-4 shadow-sm",
  mobileCardInner: "flex items-start justify-between gap-3",
  mobileMovieTitle: "font-semibold text-white text-base",
  mobileLabel: "text-xs text-gray-400 mt-1",
  mobileValue: "text-gray-200 font-medium",
  mobileEarnings: "text-sm text-red-300 font-semibold",
  mobileAvgLabel: "text-xs text-gray-400 mt-1",
  mobileAvgValue: "text-gray-300",
  mobileEmpty: "text-center py-6 text-gray-500",
  
  // Grid and cards
  gridContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
  messageContainer: "col-span-full text-center text-gray-400 py-8 border border-red-800 rounded-lg",
  bookingCard: "bg-gradient-to-r from-gray-900 to-black border border-red-800 rounded-xl p-4 shadow-lg flex flex-col justify-between",
  
  // Card content
  movieIconContainer: "w-12 h-12 rounded-md bg-red-800 flex items-center justify-center text-white",
  movieTitle: "text-lg font-bold text-red-300",
  bookingId: "text-xs text-gray-400",
  bookingIdValue: "font-mono ml-1 text-xs text-gray-200",
  bookedByLabel: "text-xs text-gray-400 mt-1",
  bookedByValue: "text-sm font-semibold text-gray-200",
  seatsLabel: "text-xs text-gray-400",
  seatsValue: "font-semibold text-gray-200",
  
  // Details section
  detailItem: "flex items-center gap-2",
  detailIcon: "w-4 h-4 text-red-400",
  auditoriumLabel: "text-xs text-gray-400 mr-2",
  auditoriumValue: "font-semibold text-gray-200",
  
  // Amount section
  amountLabel: "text-xs text-gray-400",
  amountValue: "text-lg font-bold text-red-300"
};


// CSS styles for custom classes
export const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
  .card-hover {
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .card-hover:hover {
    transform: translateY(-3px);
    border-color: rgba(116, 123, 249, 0.42);
    box-shadow: 0 14px 30px -16px rgba(0, 0, 0, 0.65);
  }
  .filter-btn {
    transition: all 0.18s ease-in-out;
  }
  .gradient-border {
    background: linear-gradient(135deg, rgba(30, 37, 61, 0.84), rgba(20, 26, 46, 0.72));
    border: 1px solid rgba(116, 123, 249, 0.16);
  }
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: rgba(75, 85, 99, 0.18);
    border-radius: 10px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(89, 97, 234, 0.55);
    border-radius: 10px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(116, 123, 249, 0.72);
  }
`;
