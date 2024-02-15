import axios from "axios";
import { Recipe } from "./RecipeDetails";

export async function fetchRecipe(id : string | undefined, setRecipe : (recipe : Recipe) => void) {
    try {
        const response = await axios.get(`http://localhost:8080/recipe/${id}`);
        setRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }