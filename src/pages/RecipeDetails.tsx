import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import Icon from '../components/Icon';
import styles from '../styles/RecipeDetails.module.css';
import Recommendations from '../components/Recommendations';
import loadingIcon from '../images/spinner.svg';
import shareIcon from '../images/shareIcon.svg';
// import favIcon from '../images/favIcon.svg';
import { LocalDataType } from '../types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getLocalData from '../helpers/getLocalData';

export default function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [details, setDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const localData: LocalDataType = {
    doneRecipes: getLocalData('doneRecipes'),
    inProgressRecipes: getLocalData('inProgressRecipes'),
    favoriteRecipes: getLocalData('favoriteRecipes'),
  };
  const [isFavorite, setIsFavorite] = useState(
    localData.favoriteRecipes.some((recipe) => recipe.id === id),
  );

  const isMeal: boolean = pathname.includes('/meals');

  const isDone: boolean = localData.doneRecipes.some((recipe) => recipe.id === id);

  const isInProgress = () => {
    if (isMeal) {
      return Object.keys(localData.inProgressRecipes.meals)
        .some((key) => key === id);
    }
    return Object.keys(localData.inProgressRecipes.drinks)
      .some((key) => key === id);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (isMeal) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          setDetails(data.meals[0]);
          setIsLoading(false);
        } catch (error:any) {
          console.log(`Failed to fetch: ${error.message}`);
        }
      }

      if (!isMeal) {
        try {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          setDetails(data.drinks[0]);
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

  const handleClick = () => {
    return isMeal ? navigate(`/meals/${id}/in-progress`)
      : navigate(`/drinks/${id}/in-progress`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  };

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
            {/* <img src={ favIcon } alt="heart" data-testid="favorite-btn" /> */}
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
        <section>
          <h2>Recommended</h2>
          <Recommendations />
        </section>
        {!isDone && (
          <button
            className={ styles.startBtn }
            data-testid="start-recipe-btn"
            onClick={ handleClick }
          >
            {isInProgress() ? 'Continue Recipe' : 'Start Recipe'}

          </button>
        )}
      </main>
    </>
  );
}
