import { combineReducers } from 'redux';
import headerReducer from './header-reducer';

const rootReducer = combineReducers({
  header: headerReducer,
});

export default rootReducer;
