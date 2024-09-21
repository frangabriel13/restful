import { combineReducers } from 'redux';
import authReducer from './authReducer';
import emailReducer from './emailReducer';
import serviceReducer from './serviceReducer';
import funeralHomeReducer from './funeralHomeReducer';
import userReducer from './userReducer';
import orderReducer from './orderReucer';

const rootReducer = combineReducers({
  auth: authReducer,
  email: emailReducer,
  service: serviceReducer,
  funeralHome: funeralHomeReducer,
  user: userReducer,
  order: orderReducer,
});


export default rootReducer;