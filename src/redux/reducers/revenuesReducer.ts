import { AnyAction } from 'redux';
import { REQUEST_FAILED, REQUEST_LOADING, REQUEST_SUCCESSFUL_DRINKS,
  REQUEST_SUCCESSFUL_MEALS } from '../actions';
import { alertMessageEmpty } from '../../utils/alertMessage';

const initialState = {
  drinks: [],
  meals: [],
  loading: false,
  caller: '',
};

const revenuesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_SUCCESSFUL_DRINKS:
      if (action.payload === null || !action.payload) {
        alertMessageEmpty();
        return {
          ...state,
          drinks: [],
        };
      }
      if (action.payload.length === 1) {
        return {
          ...state, drinks: action.payload, caller: action.caller,
        };
      }
      return {
        ...state,
        drinks: action.payload.slice(0, 12),
      };
    case REQUEST_SUCCESSFUL_MEALS:
      if (action.payload === null) {
        alertMessageEmpty();
        return {
          ...state,
          meals: [],
        };
      }
      if (action.payload.length === 1) {
        return {
          ...state, meals: action.payload, caller: action.caller,
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
        caller: '',
      };
    case REQUEST_FAILED:
      console.log('Erro request failed.');
      return state;
    default:
      return state;
  }
};

export default revenuesReducer;
