import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import Icon from '../components/Icon';
import styles from '../styles/RecipeDetails.module.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [details, setDetails] = useState<any>({});

  const isMeal: boolean = pathname.includes('/meals');

  useEffect(() => {
    const fetchDetails = async () => {
      if (isMeal) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          setDetails(data.meals[0]);
        } catch (error:any) {
          throw new Error(`Failed to fetch: ${error.message}`);
        }
      }

      if (!isMeal) {
        try {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          setDetails(data.drinks[0]);
        } catch (error:any) {
          throw new Error(`Failed to fetch: ${error.message}`);
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

  return (
    <>
      <header>
        <img
          src={ isMeal ? details.strMealThumb : details.strDrinkThumb }
          alt="meal thumb"
          data-testid="recipe-photo"
          className={ styles.photo }
        />
        <div>
          <Icon category={ details.strCategory } />
          {/* <img src={ icon } alt="" /> */}
          <span data-testid="recipe-category">{details.strCategory}</span>
          {/* <img src={ shareIcon } alt="share icon" /> */}
          {/* <button>
            <img src={ favIcon } alt="heart" />
          </button> */}
        </div>
        <h1
          data-testid="recipe-title"
          className={ styles.title }
        >
          {isMeal ? details.strMeal : details.strDrink}

        </h1>
      </header>
      <main>
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
          {/* TO DO receitas recomendadas */}
        </section>
        <button>Start Recipe</button>
      </main>
    </>
  );
}
