const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  registrationLink: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case 'REGISTER_ADMIN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'REGISTER_SUPERADMIN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'REGISTRATION_TOKEN_SUCCESS':
      return {
        ...state,
        registrationLink: action.payload.registrationLink,
        error: null,
        token: action.payload.token,
      };
    case 'REGISTRATION_TOKEN_FAILURE':
      return {
        ...state,
        registrationLink: null,
        error: action.payload,
        token: null,
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        error: null,
      };
    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        error: action.payload
      };
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        error: null,
      };
    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};


export default authReducer;