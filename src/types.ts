import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type GlobalState = {
  revenues: {
    drinks: Drink[];
    meals: Meal[];
    loading: boolean;
  }
};
export type Dispatch = ThunkDispatch<GlobalState, null, AnyAction>;

export type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};
