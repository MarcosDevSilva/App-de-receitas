import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { fetchDrinksFirstLetter, fetchDrinksIngrediant, fetchDrinksName,
  fetchMealsFirstLetter, fetchMealsIngrediant, fetchMealsName }
  from '../redux/actions/index';
import { Dispatch } from '../types';
import styles from '../styles/SearchBar.module.css';
import { alertMessage1Caracter } from '../utils/alertMessage';

function SearchBar() {
  const [search, setSearch] = useState(
    {
      text: '',
      radio: 'ingredient',
    },
  );
  const { pathname } = useLocation();
  const dispatch: Dispatch = useDispatch();

  const genericHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const searchButton = () => {
    if (pathname === '/drinks') {
      switch (search.radio) {
        case 'ingredient':
          dispatch(fetchDrinksIngrediant(search.text));
          break;
        case 'name':
          dispatch(fetchDrinksName(search.text));
          break;
        default:
          if (search.text.length === 1) {
            dispatch(fetchDrinksFirstLetter(search.text));
          } else {
            alertMessage1Caracter();
          }
          break;
      }
    } else {
      switch (search.radio) {
        case 'ingredient':
          dispatch(fetchMealsIngrediant(search.text));
          break;
        case 'name':
          dispatch(fetchMealsName(search.text));
          break;
        default:
          if (search.text.length === 1) {
            dispatch(fetchMealsFirstLetter(search.text));
          } else {
            alertMessage1Caracter();
          }
          break;
      }
    }
  };

  return (
    <div className={ styles.form }>
      <input
        type="text"
        value={ search.text }
        name="text"
        onChange={ genericHandler }
        data-testid="search-input"
        placeholder="Search"
        className={ styles.search }
      />
      <div className={ styles.div_radios }>
        <div className={ styles.radios }>
          <div className={ styles.div_each_radio }>
            <input
              type="radio"
              id="ingredient"
              name="radio"
              value="ingredient"
              onChange={ genericHandler }
              checked={ search.radio === 'ingredient' }
              data-testid="ingredient-search-radio"
              className={ styles.radio }
            />
            <label htmlFor="ingredient" className={ styles.label }>Ingredient</label>
          </div>
          <div className={ styles.div_each_radio }>
            <input
              type="radio"
              id="name"
              name="radio"
              value="name"
              onChange={ genericHandler }
              checked={ search.radio === 'name' }
              data-testid="name-search-radio"
              className={ styles.radio }
            />
            <label htmlFor="name" className={ styles.label }>Name</label>
          </div>
          <div className={ styles.div_each_radio }>
            <input
              type="radio"
              id="FirstLetter"
              name="radio"
              value="first letter"
              onChange={ genericHandler }
              checked={ search.radio === 'first letter' }
              data-testid="first-letter-search-radio"
              className={ styles.radio }
            />
            <label htmlFor="FirstLetter" className={ styles.label }>First letter</label>
          </div>
        </div>
        <button
          data-testid="exec-search-btn"
          onClick={ searchButton }
          className={ styles.button }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
