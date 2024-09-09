import { combineReducers } from 'redux';
import authReducer from './authReducer';
import emailReducer from './emailReducer';
import serviceReducer from './serviceReducer';
import funeralHomeReducer from './funeralHomeReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  email: emailReducer,
  service: serviceReducer,
  funeralHome: funeralHomeReducer,
  user: userReducer,
});


export default rootReducer;