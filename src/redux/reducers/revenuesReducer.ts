import { AnyAction } from 'redux';
import { REQUEST_FAILED, REQUEST_LOADING, REQUEST_SUCCESSFUL_DRINKS,
  REQUEST_SUCCESSFUL_MEALS } from '../actions';
import { alertMessageEmpty } from '../../utils/alertMessage';

const initialState = {
  drinks: [],
  meals: [],
  loading: false,
};

const revenuesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_SUCCESSFUL_DRINKS:
      if (action.payload === null) {
        alertMessageEmpty();
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
        alertMessageEmpty();
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
    case REQUEST_FAILED:
      console.log('Erro request failed.');
      return state;
    default:
      return state;
  }
};

export default revenuesReducer;
