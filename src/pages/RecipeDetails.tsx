import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const param = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      if (pathname === '/meals') {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param}`);
          const data = await response.json();
          setDetails(data.meals);
        } catch (error:any) {
          throw new Error(`Failed to fetch: ${error.message}`);
        }
      }

      if (pathname === '/drinks') {
        try {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${param}`);
          const data = await response.json();
          setDetails(data.meals);
        } catch (error:any) {
          throw new Error(`Failed to fetch: ${error.message}`);
        }
      }
    };

    fetchDetails();
  }, [pathname, param]);

  return (
    <>
      <header>
        <img src={ details.strMealThumb } alt="meal thumb" data-testid="recipe-photo" />
        <div>
          <img src={ icon } alt="" />
          <span data-testid="recipe-category">{details.strCategory}</span>
          <img src={ shareIcon } alt="share icon" />
          <button>
            <img src={ favIcon } alt="heart" />
          </button>
        </div>
        <h1 data-testid="recipe-title">{details.srtMeal}</h1>
      </header>
      <main>
        <section>
          <h2>Ingredients</h2>
          <div>
            {/* <span data-testid={ `${index}-ingredient-name-and-measure` } />
            TO DO lista de indredientes */}
          </div>
        </section>
        <section>
          <h2>Instructions</h2>
          <div>
            <p data-testid="instructions">{details.srtInstructions}</p>
            {/* TO DO instruções */}
          </div>
        </section>
        {pathname === '/meals'
        && <section>
          <h2>Video</h2>
          <video src={ recipeVideo } data-testid="video" />
           </section>}
        <section>
          <h2>Recommended</h2>
          {/* TO DO receitas recomendadas */}
        </section>
        <button>Start Recipe</button>
      </main>
    </>
  );
}
