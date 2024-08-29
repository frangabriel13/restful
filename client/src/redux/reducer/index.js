import { combineReducers } from 'redux';
import authReducer from './authReducer';
import emailReducer from './emailReducer';
import serviceReducer from './serviceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  email: emailReducer,
  service: serviceReducer,
});


export default rootReducer;