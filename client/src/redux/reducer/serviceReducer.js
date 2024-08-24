const initialState = {
  services: [],
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SERVICES":
      return {
        ...state,
        services: action.payload,
      };
    case "UPDATE_SERVICE":
      return {
        ...state,
        // services: state.services.map((service) =>
        //   service.id === action.payload.id ? action.payload : service
        // ),
      };
    default:
      return state;
  }
};


export default serviceReducer;