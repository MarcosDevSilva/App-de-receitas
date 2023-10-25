import { combineReducers } from 'redux';
import revenuesReducer from './revenuesReducer';

const reducers = combineReducers({
  revenues: revenuesReducer,
});

export default reducers;
