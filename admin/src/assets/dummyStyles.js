// src/assets/dummyStyles.js
// Add these to your existing assets/dummyStyles.js

export const addMoviePageStyles = {
  // Layout and container styles
  pageContainer: "min-h-screen p-3 sm:p-6 lg:p-8 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 text-gray-100",
  mainContainer: "max-w-6xl mx-auto bg-gray-900/85 backdrop-blur-xl border border-gray-700/80 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-lg shadow-black/15",
  
  // Header
  header: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4",
  title: "text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-2",
  titleIcon: "inline-block text-red-500",
  
  // Form
  form: "space-y-5 sm:space-y-6",
  radioContainer: "grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap gap-2.5 sm:gap-3 lg:gap-4",
  radioLabel: "flex min-h-11 items-center justify-center sm:justify-start gap-2 rounded-xl border border-gray-700 bg-gray-950/50 px-3 py-2 text-xs sm:text-sm text-gray-200 cursor-pointer transition-colors hover:border-gray-600",
  radioInput: "accent-red-600",
  
  // Sections
  section: "bg-gray-950/45 p-3.5 sm:p-5 rounded-2xl border border-gray-700/80 space-y-4",
  sectionGrid: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
  sectionTitle: "font-semibold text-sm sm:text-base text-gray-100",
  
  // Input fields
  inputContainer: "w-full",
  label: "block text-xs font-semibold uppercase tracking-[0.08em] text-gray-300 mb-1.5",
  input: "w-full min-h-11 sm:min-h-12 rounded-xl px-3.5 py-2.5 bg-gray-950/70 border border-gray-700 text-sm text-gray-100 placeholder-gray-500 outline-none hover:border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-500/25 transition-all",
  textarea: "w-full rounded-xl p-3 bg-gray-950/70 border border-gray-700 text-sm text-gray-100 outline-none hover:border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-500/25 transition-all",
  numberInput: "w-full sm:w-32 min-h-11 rounded-xl p-2 bg-gray-950/70 border border-gray-700 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/25",
  select: "w-full min-h-11 rounded-xl px-3 py-2 bg-gray-950/70 border border-gray-700 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/25",
  
  // Category buttons
  categoryContainer: "flex gap-2 sm:gap-3 flex-wrap",
  categoryButton: "min-h-9 sm:min-h-10 px-3.5 py-1.5 sm:py-2 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer",
  categoryButtonSelected: "bg-red-600 text-white border-red-500 shadow-sm",
  categoryButtonNormal: "bg-gray-950/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600",
  
  // File upload areas
  uploadContainer: "border border-dashed border-gray-600 rounded-2xl p-4 bg-gray-950/45 hover:border-red-400/60 transition-colors cursor-pointer block",
  uploadContent: "flex flex-col items-center justify-center gap-2 text-center",
  uploadIconContainer: "p-3 sm:p-4 rounded-xl bg-gray-800 border border-gray-700 text-red-300",
  uploadIcon: "size-10 sm:size-14",
  uploadText: "text-xs text-gray-300 opacity-90",
  uploadInput: "hidden",
  
  // Preview images
  previewContainer: "relative w-full",
  previewImage: "w-full h-40 sm:h-48 object-contain rounded-xl bg-black/40 border border-gray-800",
  previewThumbnail: "w-full h-36 sm:h-48 object-contain rounded-xl bg-black/40 border border-gray-800",
  removeButton: "absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110",
  removeIcon: "size-4 sm:size-5",
  
  // Grid layouts
  gridCols1: "grid grid-cols-1 gap-3 sm:gap-4",
  gridCols2: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
  gridCols3: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4",
  gridCols2Md3: "sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4",
  
  // Duration controls
  durationContainer: "flex gap-2.5 flex-wrap",
  durationInput: "w-full sm:w-32 rounded-lg p-2 bg-black/20 border border-red-600 text-sm",
  
  // Slots section
  slotsHeader: "flex items-center justify-between mb-3",
  addSlotButton: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-700 hover:bg-red-600 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer",
  addSlotIcon: "size-4",
  slotItem: "flex gap-2.5 items-center flex-col sm:flex-row bg-gray-950/40 p-3 sm:p-0 rounded-xl border border-gray-800 sm:border-none",
  slotGrid: "flex-1 grid grid-cols-3 gap-2 w-full",
  slotInput: "p-2 rounded-xl bg-gray-950/80 border border-gray-700 text-xs sm:text-sm text-gray-200 w-full outline-none focus:border-red-500",
  slotRemoveButton: "p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white self-end sm:self-center transition-colors cursor-pointer",
  
  // Uploader components
  uploaderContainer: "p-3 sm:p-4 bg-gray-950/50 rounded-2xl border border-gray-700/80 space-y-3",
  uploaderHeader: "flex items-center justify-between mb-2",
  uploaderTitle: "flex items-center gap-2 text-gray-200",
  uploaderTitleText: "font-semibold text-xs sm:text-sm",
  uploaderAddButton: "text-xs px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-medium rounded-full cursor-pointer transition-colors",
  uploaderAddInput: "hidden",
  uploaderGrid: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3",
  uploaderEmpty: "col-span-full text-center py-4 text-xs sm:text-sm text-gray-500 italic",
  
  // Uploader items
  uploaderItem: "relative bg-gray-900/80 p-2 rounded-xl border border-gray-800 space-y-2",
  uploaderItemImage: "w-full h-28 sm:h-32 object-contain rounded-lg bg-black/40",
  uploaderItemRemove: "absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-md transition-transform hover:scale-110",
  uploaderItemRemoveIcon: "size-4",
  uploaderItemInput: "w-full rounded-lg px-2.5 py-1.5 text-xs sm:text-sm bg-gray-950 border border-gray-700 text-gray-200 outline-none focus:border-red-500",
  
  // Named uploader
  namedUploaderGrid: "grid grid-cols-1 gap-2.5",
  namedUploaderItem: "relative flex gap-2.5 items-center bg-gray-900/80 p-2.5 rounded-xl border border-gray-800",
  namedUploaderImage: "w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 bg-black/40",
  namedUploaderInput: "w-full rounded-lg px-2.5 py-1.5 bg-gray-950 border border-gray-700 text-xs sm:text-sm text-gray-200 outline-none focus:border-red-500 mb-1",
  namedUploaderFileName: "text-[11px] text-gray-400 truncate max-w-[180px]",
  
  // Form actions
  actionsContainer: "flex gap-3 justify-end flex-col sm:flex-row pt-3 border-t border-gray-800",
  resetButton: "min-h-11 sm:min-h-12 px-5 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 w-full sm:w-auto font-medium transition-colors cursor-pointer",
  submitButton: "min-h-11 sm:min-h-12 px-7 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold shadow-md border border-red-400/25 w-full sm:w-auto transition-all cursor-pointer",
  
  // Icon sizes
  iconSm: "size-12 sm:size-16",
  iconMd: "size-10 sm:size-14",
  iconLg: "size-24 sm:size-36"
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
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-3 sm:p-8 lg:p-10",
  maxWidthContainer: "max-w-6xl mx-auto",
  
  // Header styles
  headerContainer: "mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4",
  formContainer: "flex items-center gap-2.5 w-full sm:w-auto",
  
  // Form elements
  select: "min-h-11 flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm outline-none hover:border-gray-600 focus:border-red-400 focus:ring-2 focus:ring-red-500/25",
  clearButton: "min-h-11 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-gray-700 hover:text-white transition-colors cursor-pointer",
  
  // Grid and cards
  gridContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4",
  messageContainer: "col-span-full text-center text-gray-400 py-10 border border-gray-700 rounded-2xl bg-gray-900/50 text-sm sm:text-base",
  bookingCard: "bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700/80 rounded-2xl p-4 sm:p-0 shadow-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/35 hover:shadow-md",
  
  // Card content
  movieIconContainer: "w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-600/15 border border-red-500/25 flex-shrink-0 flex items-center justify-center text-red-300",
  movieTitle: "text-base sm:text-lg font-semibold tracking-tight text-gray-100 line-clamp-1",
  bookingId: "text-xs text-gray-400 truncate max-w-[140px] sm:max-w-none",
  bookingIdValue: "font-mono ml-1 text-xs text-gray-200",
  bookedByLabel: "text-xs text-gray-400 mt-1",
  bookedByValue: "text-xs sm:text-sm font-semibold text-gray-200 truncate max-w-[140px] sm:max-w-none",
  seatsLabel: "text-xs text-gray-400",
  seatsValue: "font-semibold text-gray-200 text-sm sm:text-base",
  
  // Details section
  detailContainer: "mt-3 text-xs sm:text-sm text-gray-300 space-y-2 pt-3 border-t border-gray-800/80",
  detailItem: "flex items-center gap-2",
  detailIcon: "w-4 h-4 text-red-400 flex-shrink-0",
  auditoriumLabel: "text-xs text-gray-400 mr-2",
  auditoriumValue: "font-semibold text-gray-200",
  
  // Amount section
  amountLabel: "text-xs text-gray-400",
  amountValue: "text-base sm:text-lg font-bold text-gray-100"
};

// Font family style object
export const fontStyles = {
  cinzelFont: { fontFamily: "'Cinzel', serif" }
};

// src/assets/dummyStyles.js

export const styles3 = {
  // Layout styles
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-3 sm:p-8 lg:p-10",
  dashboardPageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-3.5 sm:p-6 lg:p-8",
  maxWidthContainer: "max-w-6xl mx-auto",
  
  // Header styles
  headerContainer: "mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4",
  dashboardHeaderContainer: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6",
  dashboardTitle: "text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-100",
  dashboardSubtitle: "text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1",
  formContainer: "flex items-center gap-3 w-full lg:w-auto",
  
  // Form elements
  select: "px-3 py-2 rounded-lg bg-gray-900 border border-red-800 text-sm outline-none focus:ring-2 focus:ring-red-600",
  clearButton: "px-3 py-2 rounded-lg bg-red-700 text-white text-sm hover:brightness-95",
  
  // Summary cards
  summaryGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8",
  summaryCard: "rounded-2xl border border-gray-700/80 bg-gradient-to-br from-gray-900 to-gray-950 p-4 sm:p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400/30",
  summaryCardInner: "flex items-center justify-between gap-2",
  summaryLabel: "text-xs text-gray-400",
  summaryValue: "text-xl sm:text-3xl font-bold tracking-tight text-gray-100",
  summaryBadge: "px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-red-600/12 border border-red-500/20 text-red-300 text-xs font-semibold flex-shrink-0",
  summaryNote: "mt-2.5 sm:mt-3 text-xs text-gray-500",
  
  // Movies section
  moviesSection: "rounded-2xl border border-gray-700/80 bg-gradient-to-br from-gray-900 to-gray-950 p-4 sm:p-5 shadow-sm",
  moviesHeader: "flex items-center justify-between mb-4",
  moviesTitle: "text-base sm:text-lg font-semibold tracking-tight text-gray-100",
  moviesCount: "text-xs sm:text-sm text-gray-400",
  
  // Table styles
  tableContainer: "hidden md:block overflow-x-auto rounded-xl border border-gray-800",
  table: "w-full table-auto min-w-[500px]",
  tableHeader: "text-xs uppercase tracking-[0.08em] text-gray-400 text-left border-b border-gray-700 bg-gray-950/60",
  tableHeaderCell: "py-3 px-3 font-semibold",
  tableRow: "border-b border-gray-800 hover:bg-white/[0.03] transition-colors",
  tableMovieTitle: "font-semibold text-white text-sm",
  tableCell: "py-3 px-3 text-sm text-gray-200",
  tableEarnings: "py-3 px-3 text-sm text-red-300 font-semibold",
  tableAvg: "py-3 px-3 text-sm text-gray-300",
  tableEmpty: "py-6 text-center text-gray-500",
  
  // Mobile cards
  mobileList: "md:hidden grid grid-cols-1 gap-3",
  mobileCard: "bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700/80 rounded-xl p-3.5 shadow-sm",
  mobileCardInner: "flex items-start justify-between gap-3",
  mobileMovieTitle: "font-semibold text-white text-sm sm:text-base",
  mobileLabel: "text-xs text-gray-400 mt-1",
  mobileValue: "text-gray-200 font-medium",
  mobileEarnings: "text-sm text-red-300 font-semibold",
  mobileAvgLabel: "text-xs text-gray-400 mt-1",
  mobileAvgValue: "text-gray-300",
  mobileEmpty: "text-center py-6 text-gray-500",
  
  // Grid and cards
  gridContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
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
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-3 sm:p-8 lg:p-10",
  dashboardPageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-3.5 sm:p-6 lg:p-8",
  maxWidthContainer: "max-w-6xl mx-auto",
  
  // Navbar styles
  navbar: "sticky top-0 bg-gray-950/95 backdrop-blur-xl border-b border-gray-700/80 shadow-sm shadow-black/20 relative z-40",
  navbarContainer: "max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8",
  navbarFlex: "flex items-center justify-between h-16",
  logoContainer: "flex items-center space-x-2.5 sm:space-x-3",
  logoIcon: "flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-red-600/15 border border-red-500/30 rounded-xl transition-colors duration-200",
  logoIconInner: "w-4 h-4 sm:w-5 sm:h-5 text-red-300",
  logoText: "text-lg sm:text-xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white to-red-200 bg-clip-text",
  desktopNav: "hidden lg:flex lg:space-x-3 xl:space-x-4",
  mobileMenuButton: "inline-flex items-center justify-center p-2 rounded-xl text-red-200 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-colors",
  mobileMenuIcon: "w-6 h-6",
  
  // Navigation links
  navLinkBase: "group flex min-h-11 items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl border transition-all duration-200",
  navLinkActive: "bg-red-600 text-white border-red-500/50 shadow-sm",
  navLinkInactive: "bg-transparent border-transparent text-gray-300 hover:bg-gray-800 hover:border-gray-700",
  navLinkIconBase: "w-4 h-4 sm:w-5 sm:h-5 transition-colors",
  navLinkIconActive: "text-white",
  navLinkIconInactive: "text-red-400 group-hover:text-red-300",
  navLinkTextBase: "text-xs sm:text-sm font-semibold tracking-normal transition-colors",
  navLinkTextActive: "text-white",
  navLinkTextInactive: "text-white group-hover:text-red-200",
  
  // Mobile menu
  mobileMenuContainer: "fixed inset-0 z-50 transition-all duration-300",
  mobileMenuBackdrop: "absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300",
  mobileMenuPanel: "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 border-l border-gray-700/80 shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col z-50",
  mobileMenuPanelHeader: "flex items-center justify-between px-5 py-4 border-b border-gray-800",
  mobileMenuPanelNav: "px-4 py-6 space-y-2.5 flex-1 overflow-y-auto",
  mobileMenuPanelFooter: "p-4 border-t border-gray-800 bg-gray-950/80",
  mobileMenuFooterText: "text-xs text-red-300/80 text-center font-medium",
  
  // Mobile navigation links
  mobileNavLinkBase: "flex items-center space-x-3 w-full px-4 py-3.5 rounded-xl transition-all min-h-[48px]",
  mobileNavLinkActive: "bg-red-600 text-white shadow-md font-semibold",
  mobileNavLinkInactive: "hover:bg-white/5 text-gray-300 hover:text-white font-medium",
  mobileNavLinkIconBase: "w-5 h-5 flex-shrink-0",
  mobileNavLinkIconActive: "text-white",
  mobileNavLinkIconInactive: "text-red-400",
  mobileNavLinkText: "font-semibold text-sm",
  
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
  pageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-3 sm:p-8 lg:p-10",
  dashboardPageContainer: "min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-3.5 sm:p-6 lg:p-8",
  listMoviesContainer: "min-h-screen p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-950 via-gray-950 to-gray-900 text-gray-100",
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
  listMoviesHeader: "mb-6 sm:mb-8 space-y-4 sm:space-y-6",
  listMoviesHeaderInner: "flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6",
  listMoviesTitle: "text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white",
  listMoviesSubtitle: "text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1",
  searchContainer: "w-full flex items-center justify-center lg:justify-end mt-2 sm:mt-4 lg:mt-0",
  searchBox: "relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-[540px] mx-auto lg:mx-0",
  searchInput: "w-full min-h-11 sm:min-h-12 pl-4 pr-11 py-2.5 sm:py-3 rounded-xl text-xs sm:text-base bg-gray-900/80 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/25 focus:border-red-400 backdrop-blur-sm",
  searchIcon: "absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400",
  
  // Filter Tabs
  filterContainer: "flex flex-nowrap overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-2 sm:gap-3 justify-start md:justify-start no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0",
  filterButton: "filter-btn flex-shrink-0 flex min-h-10 sm:min-h-11 items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm border transition-all duration-200 cursor-pointer",
  filterButtonActive: "bg-red-600 border-red-500/50 text-white shadow-sm",
  filterButtonInactive: "bg-gray-900/60 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600",
  
  // Main Grid
  mainGrid: "grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8",
  leftColumn: "lg:col-span-2 xl:col-span-2",
  rightColumn: "hidden lg:block lg:col-span-2 xl:col-span-2",
  cardsGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",
  
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
  card: "card-hover flex h-full min-h-[440px] sm:min-h-[500px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-700/70 bg-gray-900/90 shadow-sm group",
  cardMedia: "relative h-52 sm:h-64 overflow-hidden bg-gray-950",
  cardImageBackdrop: "absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl transition-transform duration-500 group-hover:scale-[1.14]",
  cardImageOverlay: "pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-gray-950/45 via-transparent to-black/10",
  cardDeleteButton: "absolute top-3 right-3 z-10 grid size-8 sm:size-9 cursor-pointer place-items-center rounded-xl border border-white/10 bg-gray-950/75 text-gray-300 backdrop-blur-md transition-all hover:border-red-400/40 hover:bg-red-600 hover:text-white focus-visible:outline-none",
  cardImage: "relative z-[1] h-full w-full object-contain object-center p-3 transition-transform duration-500 ease-out group-hover:scale-[1.015]",
  cardContent: "flex flex-1 flex-col p-4 sm:p-5",
  cardHeader: "mb-2.5 sm:mb-3 min-w-0",
  cardTitle: "line-clamp-2 min-h-[40px] sm:min-h-[48px] text-base sm:text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-red-200",
  cardCategories: "mt-2.5 sm:mt-3 flex min-h-6 flex-wrap gap-1.5",
  cardCategory: "rounded-full border border-gray-700 bg-gray-800/80 px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium leading-none text-gray-300",
  cardRatingContainer: "mb-3 sm:mb-4 flex min-h-7 flex-wrap items-center gap-2",
  cardRating: "flex items-center gap-1.5 rounded-lg border border-yellow-400/15 bg-yellow-400/10 px-2 sm:px-2.5 py-1 text-xs sm:text-sm",
  cardRatingIcon: "text-yellow-400",
  cardRatingText: "text-xs sm:text-sm font-semibold text-yellow-300",
  cardDuration: "flex items-center gap-1.5 rounded-lg border border-red-400/15 bg-red-500/10 px-2 sm:px-2.5 py-1 text-xs sm:text-sm",
  cardDurationIcon: "text-red-300",
  cardDurationText: "text-xs sm:text-sm font-medium text-gray-300",
  cardDescription: "mb-4 sm:mb-5 line-clamp-2 sm:line-clamp-3 min-h-[40px] sm:min-h-[63px] text-xs sm:text-sm leading-4 sm:leading-5 text-gray-400",
  cardActions: "mt-auto flex items-center gap-2 border-t border-gray-800 pt-3 sm:pt-4",
  cardViewButton: "flex min-h-10 sm:min-h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-red-400/25 bg-red-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-500",
  cardTrailerButton: "flex min-h-10 sm:min-h-11 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-gray-700 bg-gray-800 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-200 transition-colors hover:border-red-400/35 hover:bg-gray-700 hover:text-white",
  cardTrailerIcon: "h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-300",
  
  // Detail View Sidebar & Modal
  detailSidebar: "bg-gray-900/75 border border-gray-700/80 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm backdrop-blur-sm lg:sticky lg:top-6 lg:max-h-[85vh] overflow-y-auto",
  detailModalBackdrop: "fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-300 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:hidden",
  detailModalContainer: "w-full max-w-2xl bg-gray-950 border border-gray-700/80 rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in slide-in-from-bottom-6 duration-300",
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
  detailContainer: "space-y-4 sm:space-y-6",
  detailHeaderContainer: "flex justify-between items-start gap-3 mb-2",
  detailTypeIndicator: "flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3",
  detailTypeDot: "w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r",
  detailTypeText: "text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wide",
  detailContentTitle: "text-lg sm:text-2xl font-bold text-white leading-tight",
  detailCloseButton: "flex-shrink-0 p-2 sm:p-2.5 gradient-border rounded-xl text-gray-400 hover:text-white hover:border-red-500/60 transition-all duration-300 cursor-pointer",
  
  // Detail Sections
  detailThumbnail: "rounded-2xl overflow-hidden gradient-border",
  detailThumbnailImage: "w-full h-44 sm:h-56 object-contain",
  detailGrid: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3.5 sm:p-4 gradient-border rounded-2xl",
  detailGridItem: "space-y-1 sm:space-y-2",
  detailGridLabel: "text-gray-400 text-xs sm:text-sm uppercase font-semibold",
  detailGridValue: "text-white text-xs sm:text-sm font-medium",
  detailRatingValue: "flex items-center gap-2 text-yellow-400 text-xs sm:text-sm font-bold",
  detailDescription: "space-y-2 sm:space-y-3",
  descriptionLabel: "text-gray-400 text-xs sm:text-sm uppercase font-semibold",
  descriptionText: "text-gray-300 leading-relaxed text-xs sm:text-base",
  watchTrailerButton: "flex min-h-11 sm:min-h-12 items-center justify-center gap-2.5 sm:gap-3 w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-xl text-white font-semibold text-xs sm:text-base hover:from-red-700 hover:to-red-600 transition-all duration-200 cursor-pointer shadow-sm",
  
  // Movie Details
  detailPoster: "w-full h-56 sm:h-72 object-contain",
  detailInfoGrid: "grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 p-3.5 sm:p-5 gradient-border rounded-2xl",
  detailInfoItem: "space-y-1",
  detailInfoLabel: "text-gray-400 text-xs sm:text-sm uppercase font-semibold",
  detailInfoValue: "text-white font-medium text-sm sm:text-lg",
  seatPrice: "text-green-400 font-bold text-sm sm:text-lg",
  storySection: "space-y-2 sm:space-y-3",
  storyLabel: "flex items-center gap-2.5 sm:gap-3",
  storyDot: "w-1.5 h-5 sm:h-6 bg-red-500 rounded-full",
  storyText: "text-gray-300 leading-relaxed text-xs sm:text-base",
  
  // Showtimes
  showtimesSection: "space-y-3 sm:space-y-4",
  showtimesHeader: "flex items-center gap-2 sm:gap-3",
  showtimesIcon: "text-red-400 size-4 sm:size-5",
  showtimesList: "space-y-2.5 sm:space-y-3",
  showtimeItem: "flex items-center justify-between p-3 sm:p-4 gradient-border rounded-2xl hover:border-red-500/60 transition-all duration-300 cursor-pointer text-xs sm:text-sm",
  showtimeText: "text-white font-medium",
  showtimeStatus: "flex items-center gap-1.5 sm:gap-2",
  showtimeDot: "w-2 h-2 bg-green-500 rounded-full animate-pulse",
  showtimeStatusText: "text-green-400 text-[11px] sm:text-xs font-semibold",
  
  // Release Soon
  releaseSoonContainer: "text-center space-y-4 sm:space-y-6 py-6 sm:py-8",
  releaseSoonImage: "rounded-2xl overflow-hidden gradient-border mx-auto max-w-xs sm:max-w-sm transform transition-transform duration-500",
  releaseSoonText: "text-gray-400 text-base sm:text-lg font-semibold",
  releaseSoonCategories: "flex justify-center flex-wrap gap-2 sm:gap-3",
  releaseSoonCategory: "px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700/50 rounded-full text-xs sm:text-sm text-gray-300 border border-gray-600 font-medium",
  releaseSoonMessage: "text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4",
  
  // Person Grid
  personGrid: "mt-4 sm:mt-6",
  personHeader: "flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4",
  personDot: "w-1.5 h-5 sm:h-6 bg-red-500 rounded-full",
  personTitle: "font-bold text-white text-sm sm:text-lg",
  personList: "flex gap-3 sm:gap-4 overflow-x-auto pb-3 sm:pb-4 scrollbar-thin no-scrollbar",
  personItem: "flex-shrink-0 text-center group cursor-pointer",
  personAvatar: "w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl mb-2 sm:mb-3 mx-auto border-2 border-gray-600 group-hover:border-red-500 transition-all duration-300 group-hover:scale-105",
  personName: "font-semibold text-xs sm:text-sm text-white truncate max-w-[80px] sm:max-w-[100px] mx-auto",
  personRole: "text-gray-400 text-[10px] sm:text-xs mt-1 px-2 py-0.5 sm:py-1 bg-gray-700/50 rounded-full truncate max-w-[85px] sm:max-w-[105px] mx-auto",
  
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
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
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
