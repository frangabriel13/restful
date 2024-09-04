import { combineReducers } from 'redux';
import authReducer from './authReducer';
import emailReducer from './emailReducer';
import serviceReducer from './serviceReducer';
import funeralHomeReducer from './funeralHomeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  email: emailReducer,
  service: serviceReducer,
  funeralHome: funeralHomeReducer
});


export default rootReducer;