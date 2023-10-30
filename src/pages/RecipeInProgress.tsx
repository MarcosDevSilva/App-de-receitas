export default function RecipeInProgress() {
  return (
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
  );
}
