import { AnyAction } from 'redux';

const INITIAL_STATE = {
  title: 'App de Receitas',
};

const headerReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default headerReducer;
