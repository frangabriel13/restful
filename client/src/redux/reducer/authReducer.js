const initialState = {
  user: null,
};

//Solo lo creé para tener una referencia de como se vería el reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};


export default authReducer;