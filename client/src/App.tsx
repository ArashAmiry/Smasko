import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import RecipeCardList from './RecipeCardList';
import CreateRecipe from './CreateRecipe';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<RecipeCardList />}></Route>
            <Route path="/create" element={<CreateRecipe />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
