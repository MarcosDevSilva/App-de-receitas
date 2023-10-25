import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let title = '';

  if (pathname === '/meals') {
    title = 'Meals';
  } else if (pathname === '/drinks') {
    title = 'Drinks';
  } else if (pathname === '/profile') {
    title = 'Profile';
  } else if (pathname === '/done-recipes') {
    title = 'Done Recipes';
  } else if (pathname === '/favorite-recipes') {
    title = 'Favorite Recipes';
  }

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <button onClick={ () => navigate('/profile') }>
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </button>
      {
      (pathname === '/meals' || pathname === '/drinks')
      && (
        <div>
          <button onClick={ () => setSearchBar(!searchBar) }>
            <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
          </button>
          {searchBar && <SearchBar /> }
        </div>
      )
      }
    </header>
  );
}
