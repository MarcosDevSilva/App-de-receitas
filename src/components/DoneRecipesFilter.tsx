import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import allIcon from '../images/all-icon.svg';
import styles from '../styles/DoneRecipesFilter.module.css';

type DoneRecipesFilterType = {
  handleFilter: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function DoneRecipesFilter({ handleFilter }: DoneRecipesFilterType) {
  return (
    <nav className={ styles.container }>
      <button
        className={ styles.button }
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ (e) => handleFilter(e) }
      >
        <img src={ allIcon } alt="all" className={ styles.icon } />
        All
      </button>
      <button
        className={ styles.button }
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ (e) => handleFilter(e) }
      >
        <img src={ mealIcon } alt="food" className={ styles.icon } />
        Food
      </button>
      <button
        className={ styles.button }
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ (e) => handleFilter(e) }
      >
        <img
          src={ drinkIcon }
          alt="drink"
          className={ styles.iconDrinks }
        />
        Drink
      </button>
    </nav>
  );
}

export default DoneRecipesFilter;
