import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import RecipeCardList from './RecipeCardList';
import CreateRecipe from './CreateRecipe';
import RecipeDetails from './RecipeDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<RecipeCardList />}></Route>
            <Route path="/create" element={<CreateRecipe />}></Route>
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
