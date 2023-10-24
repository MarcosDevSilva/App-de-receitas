import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteResipes';
import Drinks from './pages/Drinks';
import LoginPage from './pages/LoginPage';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <LoginPage /> } />
      <Route path="meals:id" element={ <Meals /> } />
      <Route path="drinks:id" element={ <Drinks /> } />
      <Route path="meals:id/in-progress" element={ <Meals /> } />
      <Route path="drinks:id/in-progress" element={ <Drinks /> } />
      <Route element={ <Layout /> }>
        <Route path="meals" element={ <Meals /> } />
        <Route path="drinks" element={ <Drinks /> } />
        <Route path="profile" element={ <Profile /> } />
        <Route path="done-recipes" element={ <DoneRecipes /> } />
        <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
