const initialState = {
    movieName: "",
    categories: [],
    poster: null,
    posterPreview: null,
    trailerUrl: "",
    videoUrl: "",
    rating: 7.5,
    duration: 120,
    slots: [{ id: Date.now(), date: "", time: "", ampm: "AM" }],
    castImages: [],
    directorImages: [],
    producerImages: [],
    story: "",
    movieType: "Normal",
    standardSeatPrice: 0,
    reclinerSeatPrice: 0,
    ltDurationHours: 1,
    ltDurationMinutes: 30,
    ltYear: new Date().getFullYear(),
    ltDescription: "",
    ltThumbnail: null,
    ltThumbnailPreview: null,
    ltVideoUrl: "",
    ltDirectorImages: [],
    ltProducerImages: [],
    ltSingerImages: [],
    durationHours: 2,
    durationMinutes: 0,
    customerAuditorium: "",
    isUploading: false,
};


function addPageReducer(state, action) {
    switch(action.type){

    //for movie
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    
      //for duration
    case "SET_FIELDS":
      return { ...state, ...action.fields };

    case "TOGGLE_CATEGORY":
        const cat = action.category;
        const exists = state.categories.includes(cat);
        return{
            ...state,
            categories: exists
            ? state.categories.filter((c) => c !== cat)
            : [...state.categories, cat],
        };

    case "ADD_SLOTS":
        return{
            ...state,
            slots: [
                ...state.slots,
                { id: Date.now() + Math.random(), date: "", time: "", ampm: "AM" },
            ],
        };

    case REMOVE_SLOTS:
        return{
            ...state,
            slots: state.slots.filter((s) => s.id !== action.id),
        };

    case UPDATE_SLOTS:
        return{
            ...state,
            slots: state.slots.map((s)=>
            s.id === action.id ? { ...s, [action.field]: action.value} : s
            ),
        };
    
    case "ADD_ITEMS":
      return {
        ...state,
        [action.field]: [...state[action.field], ...action.items],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        [action.field]: state[action.field].filter(
          (_, i) => i !== action.index
        ),
      };
    
    case "UPDATE_ITEM":
      return {
        ...state,
        [action.field]: state[action.field].map((it, i) =>
          i === action.index ? { ...it, [action.key]: action.value } : it
        ),
      };

    case "RESET":
      return {
        ...initialAddPageState,
        slots: [{ id: Date.now(), date: "", time: "", ampm: "AM" }],
        ltYear: new Date().getFullYear(),
      };

    default:
      return state;
    }
}

export {initialState, addPageReducer};