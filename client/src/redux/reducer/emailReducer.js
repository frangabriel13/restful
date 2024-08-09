const initialState = {
  loading: false,
  error: null,
  success: null,
};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_EMAIL':
      return {
        ...state,
      };
    default:
      return state;
  }
};


export default emailReducer;