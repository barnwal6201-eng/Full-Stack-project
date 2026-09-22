const initialState = {
    movie: null,
    loading: true,
    fetchError: null,
    bookedCounts: {},
    posterField: false,
    showTrailer: false,
    selectedTrailerId: null,
    selectedMovie: null,
    selectedDay: 0,
    selectedTime: null,
};

function movieDetailReducer(state, action){
  switch(action.type){
    case 'FETCH_START':
        return {...state, loading: true, fetchError: null};

    case 'FETCH_SUCCESS': {
        const item = action.movie;
        return {
            ...state,
            loading: false,
            movie: item,
            fetchError: item ? null : "Movie data was empty in the server response.",
            posterField: false,
        };
    };

    case 'FETCH_ERROR':
        return {
            ...state,
            loading: false,
            movie: null,
            fetchError: action.error,
        };

    case 'SET_BOOKED_COUNTS':
        return {
            ...state,
            bookedCounts: action.counts,
        };

    case 'POSTER_ERROR':
        return {
            ...state,
            posterField: true,
        };

    case 'OPEN_TRAILER':
        return{
            ...state,
            showTrailer: true,
            selectedMovie: action.movie,
            selectedTrailerId: action.trailerId,
        };

    case 'CLOSE_TRAILER':
        return{
            ...state,
            showTrailer: false,
            selectedMovie: null,
            selectedTrailerId: null,
        };

    case 'SELECT_DAY':
        return {
            ...state,
            selectedDay: action.day,
            selectedTime: null,
        };

    case 'SELECT_TIME':
        return {
            ...state,
            selectedTime: action.time,
        };

    case 'DAY_CHANGED': {
        const count = action.count;
        const dayStillValid = state.selectedDay >= 0 && state.selectedDay < count;
        return {
            ...state,
            selectedDay: count === 0 ? 0 : (dayStillValid ? state.selectedDay : 0),
            selectedTime: null,
        };
    };

    default: 
    return state;

  }
};

export {initialState, movieDetailReducer}