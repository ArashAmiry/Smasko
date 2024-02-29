import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import RecipeCardList from './components/Recipe/RecipeCardList';
import CreateRecipe from './CreateRecipe';
import RecipeDetails from './RecipeDetails';
import MyRecipes from './MyRecipes';
import EditRecipe from './EditRecipe';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<MyRecipes />} />
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
