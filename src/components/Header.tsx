import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <h1 data-testid="page-title">Título</h1>
      <button data-testid="profile-top-btn">
        <img src={profileIcon} alt="profile icon" />
      </button>
      <button data-testid="search-top-btn">
        <img src={searchIcon} alt="search icon" />
      </button>
    </header>
  );
}
