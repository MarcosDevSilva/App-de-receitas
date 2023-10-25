import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import recipesAppIcon from '../images/icon-recipes-app.svg';
import logo from '../images/logo-recipes-app.svg';
import styles from '../styles/Header.module.css';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import favIcon from '../images/favorite-icon.svg';
import doneIcon from '../images/done-recipes.svg';

export default function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let title = '';
  let icon = '';

  if (pathname === '/meals') {
    title = 'Meals';
    icon = mealIcon;
  } else if (pathname === '/drinks') {
    title = 'Drinks';
    icon = drinkIcon;
  } else if (pathname === '/profile') {
    title = 'Profile';
    icon = profileIcon;
  } else if (pathname === '/done-recipes') {
    title = 'Done Recipes';
    icon = doneIcon;
  } else if (pathname === '/favorite-recipes') {
    title = 'Favorite Recipes';
    icon = favIcon;
  }

  return (
    <header>
      <div className={ styles.upperBar }>
        <img src={ recipesAppIcon } alt="application icon" />
        <img className={ styles.logo } src={ logo } alt="application logo" />
        {(pathname === '/meals' || pathname === '/drinks')
        && (
          <button
            className={ styles.searchBtn }
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
          </button>
        )}
        <button className={ styles.profileBtn } onClick={ () => navigate('/profile') }>
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </button>
      </div>
      <div className={ styles.titleContainer }>
        <img src={ icon } alt="page icon" />
        <h1 className={ styles.title } data-testid="page-title">{title}</h1>
      </div>
      {searchBar && <SearchBar /> }
    </header>
  );
}
