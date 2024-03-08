import { useEffect, useState } from "react";
import axios from "axios";
import { Recipe } from "./Recipe";
import RecipeCardList from "./RecipeCardList";

function DisplayRecipes({searchTerm, path, showIngredients}: {searchTerm: string, path: string, showIngredients: (id : string) => void}) {
  // State to store the list of recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Function to fetch and filter the recipes from the server
  async function filterRecipes() {
      await axios.get<Recipe[]>(`http://localhost:8080/${path}`)
      .then( function(response) {
        const newRecipes : Recipe[] = response.data;

        // Filter recipes based on the searchTerm prop to implement search functionality
        const filteredRecipes = newRecipes.filter(recipe => recipe.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setRecipes(filteredRecipes);})
      .catch( function (error) {
          console.log(error);
      });
  }

  useEffect(() => {
    filterRecipes();
  }, [searchTerm]); 

  return (
    <RecipeCardList recipes={recipes} showIngredients={(id) => showIngredients(id)}></RecipeCardList>  
  );
}

export default DisplayRecipes; 