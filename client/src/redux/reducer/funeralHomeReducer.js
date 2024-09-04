const initialState = {
  funeralHomes: [],
};

const funeralHomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FUNERALHOMES":
      return {
        ...state,
        funeralHomes: action.payload,
      };
    case "UPDATE_FUNERALHOME":
      return {
        ...state,
        funeralHomes: state.funeralHomes.map((funeralHome) =>
          funeralHome.id === action.payload.id ? action.payload : funeralHome
        ),
      };
    case "CREATE_FUNERALHOME":
      return {
        ...state,
        funeralHomes: [...state.funeralHomes, action.payload],
      };
    case "DELETE_FUNERALHOME":
      return {
        ...state,
        funeralHomes: state.funeralHomes.filter(
          (funeralHome) => funeralHome.id !== action.payload
        ),
      };
    default:
      return state;
  }
};


export default funeralHomeReducer;