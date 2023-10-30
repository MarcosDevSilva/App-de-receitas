import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import Icon from '../components/Icon';
import shareIcon from '../images/shareIcon.svg';
import styles from '../styles/RecipeDetails.module.css';
import getLocalData from '../helpers/getLocalData';
import { LocalDataType } from '../types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getDrink } from '../services/Drinks/ApiDrinks';
import { getMeal } from '../services/Meals/ApiMeals';
import loadingIcon from '../images/spinner.svg';

export default function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  // TO DO passar is loading para redux??
  const [isLoading, setIsLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);

  // TO DO passar details e localData para redux
  const [details, setDetails] = useState<any>({});
  const localData: LocalDataType = {
    doneRecipes: getLocalData('doneRecipes'),
    inProgressRecipes: getLocalData('inProgressRecipes'),
    favoriteRecipes: getLocalData('favoriteRecipes'),
  };
  const [isFavorite, setIsFavorite] = useState(
    localData.favoriteRecipes.some((recipe) => recipe.id === id),
  );

  const isMeal: boolean = pathname.includes('/meals');

  useEffect(() => {
    const fetchDetails = async () => {
      if (isMeal) {
        try {
          const response = await getMeal(id as string);
          setDetails(response.meals[0]);
          setIsLoading(false);
        } catch (error:any) {
          console.log(`Failed to fetch: ${error.message}`);
        }
      }

      if (!isMeal) {
        try {
          const response = await getDrink(id as string);
          setDetails(response.drinks[0]);
          setIsLoading(false);
        } catch (error:any) {
          console.log(`Failed to fetch: ${error.message}`);
        }
      }
    };

    fetchDetails();
  }, [pathname, id, isMeal]);

  const ingredients = Object.keys(details)
    .filter((key) => key.includes('Ingredient'))
    .map((key) => details[key])
    .filter((ingredient) => ingredient !== '' && ingredient !== null);

  const measurements = Object.keys(details)
    .filter((key) => key.includes('Measure'))
    .map((key) => details[key]);

  const setToFavorites = () => {
    if (isFavorite) {
      const newFavList = localData.favoriteRecipes.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavList));
      setIsFavorite(false);
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...localData.favoriteRecipes, {
          id: isMeal ? details.idMeal : details.idDrink,
          type: isMeal ? 'meal' : 'drink',
          nationality: isMeal ? details.strArea : '',
          category: details.strCategory,
          alcoholicOrNot: isMeal ? '' : details.strAlcoholic,
          name: isMeal ? details.strMeal : details.strDrink,
          image: isMeal ? details.strMealThumb : details.strDrinkThumb,
        }]),
      );
      setIsFavorite(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  };

  if (isLoading) {
    return (
      <div className={ styles.loading }>
        <img src={ loadingIcon } alt="loading" />
      </div>
    );
  }

  return (
    <>
      <header className={ styles.headerDetails }>
        <img
          src={ isMeal ? details.strMealThumb : details.strDrinkThumb }
          alt="meal thumb"
          data-testid="recipe-photo"
          className={ styles.photo }
        />
        <div className={ styles.categoryContainer }>
          <Icon category={ isMeal ? details.strCategory : details.strAlcoholic } />
          <h3 data-testid="recipe-category">
            {isMeal ? details.strCategory : details.strAlcoholic}
          </h3>
          <button
            data-testid="share-btn"
            onClick={ handleCopy }
            className={ styles.shareBtn }
          >
            <img
              src={ shareIcon }
              alt="share icon"
              className={ styles.shareIcon }
            />
          </button>
          <button className={ styles.shareBtn } onClick={ setToFavorites }>
            {isFavorite ? (
              <img src={ blackHeartIcon } alt="heart" data-testid="favorite-btn" />
            ) : (
              <img src={ whiteHeartIcon } alt="heart" data-testid="favorite-btn" />
            )}
          </button>
        </div>
        <h1
          data-testid="recipe-title"
          className={ styles.title }
        >
          {isMeal ? details.strMeal : details.strDrink}
        </h1>
      </header>
      <main>
        {alertVisible && <span className={ styles.copyAlert }>Link copied!</span>}
        <section>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.filter((ingredient) => ingredient !== null)
              .map((ingredient, index) => {
                return (
                  <li
                    key={ `${index}-ingredient-name-and-measure` }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {`${measurements[index]} ${ingredient}`}
                  </li>
                );
              })}
          </ul>
        </section>
        <section>
          <h2>Instructions</h2>
          <div>
            <p data-testid="instructions">{details.strInstructions}</p>
          </div>
        </section>
        {isMeal && (
          <section>
            <h2>Video</h2>
            <ReactPlayer
              url={ details.strYoutube }
              controls
              width="21rem"
              height="12.81819rem"
              data-testid="video"
            />
          </section>
        )}
        <button>Finish Recipe</button>
      </main>
    </>
  );
}
