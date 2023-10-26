import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/youtube';

export default function RecipeDetails() {
  const param = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState(
    {
      strMealThumb: '',
      strDrinkThumb: '',
      strMeal: '',
      strDrink: '',
      strInstructions: '',
      strYoutube: '',
    },
  );
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      if (pathname.includes('meals')) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param.id}`);
          const data = await response.json();
          setDetails(data.meals[0]);
          console.log(data.meals[0]);

          setType('meal');
        } catch (error:any) {
          throw new Error(`Failed to fetch: ${error.message}`);
        }
      }

      if (pathname.includes('drinks')) {
        try {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${param.id}`);
          const data = await response.json();
          setDetails(data.drinks[0]);
          setType('drink');
        } catch (error:any) {
          throw new Error(`Failed to fetch: ${error.message}`);
        }
      }
    };

    fetchDetails();
  }, []);

  const ingredients = Object.keys(details).filter((key) => key.includes('strIngredient')
   && details[key] !== null);

  const opts = {
    height: '350',
    width: '350',
  };
  return (
    <div>
      { type !== '' && (
        <>
          <header>
            <img
              src={ type === 'meal' ? details?.strMealThumb : details.strDrinkThumb }
              alt="meal thumb"
              data-testid="recipe-photo"
            />
            <div>
              {/* <img src={ icon } alt="icon" />
              <span data-testid="recipe-category">{details.strCategory}</span>
              <img src={ shareIcon } alt="share icon" />
              <button>
                <img src={ favIcon } alt="heart" />
      </button> */}
            </div>
            <h1>{ type === 'meal' ? details.strMeal : details.strDrink }</h1>
          </header>
          <main>
            <section>
              <h2>Ingredients</h2>
              <div>
                {ingredients.map((element, index) => (
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ element }
                  >
                    { details[element] }
                  </p>))}
              </div>
            </section>
            <section>
              <h2>Instructions</h2>
              <div>
                <p data-testid="instructions">{details.strInstructions }</p>
                {/* TO DO instruções */}
              </div>
            </section>
            { pathname.includes('meals') && (
              <>
                {/* <section>
                <h2>Video</h2>
                <video src={ details.s } data-testid="video" />
              </section> */}
                <YouTube
                  videoId={ details.strYoutube.split('=')[1] }
                  data-testid="video"
                  opts={ opts }
                />
                <ReactPlayer
                  url={ details.strYoutube }
                  controls
                  width="350px"
                  height="350px"
                />

              </>
            )}
            <section>
              <h2>Recommended</h2>
              {/* TO DO receitas recomendadas */}
            </section>
            <button>Start Recipe</button>
          </main>
        </>
      ) }
    </div>
  );
}
