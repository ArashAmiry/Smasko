import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Assuming RecipeCard is in the same directory
type Recipe = {
    id: number;
    name: string;
    img: string;
    // Add more properties as needed
  };

function RecipeCardList() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://localhost:8080/recipe')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="container-fluid">
      {recipes.map((recipe) => (
        <RecipeCard
          id="1" // Assuming each recipe has a unique id
          name={recipe.name}
          img={recipe.img}
        />
      ))}
    </div>
  );
}

export default RecipeCardList;
