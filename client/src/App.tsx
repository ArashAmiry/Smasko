import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import RecipeCardList from './components/Recipe/RecipeCardList';
import CreateRecipe from './CreateRecipe';
import RecipeDetails from './RecipeDetails';
import AllRecipes from './AllRecipes';
import EditRecipe from './EditRecipe';
import FavoriteRecipes from './Favorites';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<AllRecipes />} />
            <Route path="/favorites" element={<FavoriteRecipes />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/recipe/editor/:id" element={<EditRecipe />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
