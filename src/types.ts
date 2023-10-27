import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type GlobalState = {
  revenues: {
    drinks: Drink[];
    meals: Meal[];
    loading: boolean;
    caller: string;
  }
};
export type Dispatch = ThunkDispatch<GlobalState, null, AnyAction>;

export type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strDrinkAlternate: null;
  strTags: null;
  strVideo: null;
  strCategory: string;
  strIBA: null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: null;
  strInstructionsDE: string;
  strInstructionsFR: null;
  strInstructionsIT: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10:string;
  strMeasure11:string;
  strMeasure12:string;
  strMeasure13:string;
  strMeasure14:string;
  strMeasure15:string;
  strImageSource: string;
  strImageAttribution: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strDrinkAlternate: null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: null;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null
};

export type RecipesType = {
  drink: Drink[]
  meal: Meal[]
  loading: boolean;
  recipeType: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type IngredientType = Meal | Drink;

export type DetailsKeys = 'strIngredient1' | 'strIngredient2' | 'strIngredient3' |
'strIngredient4' | 'strIngredient5' | 'strIngredient6' | 'strIngredient7' |
'strIngredient8' | 'strIngredient9' | 'strIngredient10' | 'strIngredient11' |
'strIngredient12' | 'strIngredient13' | 'strIngredient14' | 'strIngredient15' |
'strIngredient16' | 'strIngredient17' | 'strIngredient18' | 'strIngredient19' |
'strIngredient20';

export type DoneRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
};

export type InProgressRecipeType = {
  drinks: object,
  meals: object,
};

export type FavoriteRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};

export type LocalDataType = {
  doneRecipes: DoneRecipeType[],
  inProgressRecipes: InProgressRecipeType,
  favoriteRecipes: FavoriteRecipeType[],
};

export type DoneRecipesCardType = {
  id: string,
  category: string,
  name: string,
  img: string,
  doneDate: string,
  tags: string[],
  nationality: string,
  index: number,
  type: string,
};
