import axios from "axios";
import { Recipe } from "./components/Recipe/Recipe";

export async function fetchRecipe(id : string) : Promise<Recipe | undefined> {
    try {
        const response = await axios.get(`http://localhost:8080/recipe/${id}`);
        return response.data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }