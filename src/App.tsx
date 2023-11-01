import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="meals/:id" element={ <RecipeDetails /> } />
      <Route path="drinks/:id" element={ <RecipeDetails /> } />
      <Route path="meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="drinks/:id/in-progress" element={ <RecipeInProgress /> } />
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
