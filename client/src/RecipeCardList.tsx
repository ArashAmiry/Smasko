import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard'; // Assuming RecipeCard is in the same directory
import axios from 'axios';

type Recipe = {
    id: number;
    name: string;
    img: string;
    // Add more properties as needed
  };

function RecipeCardList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function updateRecipes() {
    setTimeout(async () => {
      const response = await axios.get<Recipe[]>("http://localhost:8080/recipe");
      const newRecipes : Recipe[] = response.data;
      setRecipes(newRecipes);
    }, 2000);
  }

  useEffect(() => {
    updateRecipes();
  }, []); 


  return (
    <div className="container-fluid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id.toString()} // Assuming each recipe has a unique id
          name={recipe.name}
          img={recipe.img}
        />
      ))}
    </div>
  );
}

export default RecipeCardList;
