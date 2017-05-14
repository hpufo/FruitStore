import { combineReducers } from 'redux';
import fruits from './fruitsReducer';

/* The combinded reducers will make up the store's state
*/
export default combineReducers({
  fruits
});