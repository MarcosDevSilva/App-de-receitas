import { AnyAction } from 'redux';
import { REQUEST_LOADING, REQUEST_SUCCESSFUL_DRINKS,
  REQUEST_SUCCESSFUL_MEALS } from '../actions';

const initialState = {
  drinks: [],
  meals: [],
  loading: false,
};

const revenuesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_SUCCESSFUL_DRINKS:
      if (action.payload === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters.');
        return {
          ...state,
          drinks: [],
        };
      }
      return {
        ...state,
        drinks: action.payload.slice(0, 12),
      };
    case REQUEST_SUCCESSFUL_MEALS:
      if (action.payload === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters.');
        return {
          ...state,
          meals: [],
        };
      }
      return {
        ...state,
        meals: action.payload.slice(0, 12),
      };
    case REQUEST_LOADING:
      return {
        ...state,
        loading: action.payload,
        drinks: [],
        meals: [],
      };
    default:
      return state;
  }
};

export default revenuesReducer;
