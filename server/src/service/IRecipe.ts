import { Recipe } from '../model/recipe';

export interface IRecipeService {
    getRecipes(): Promise<Recipe[]>;
    addRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe>;
    deleteRecipe(id: string): Promise<boolean>;
    getRecipe(recipeId: string): Promise<Recipe | undefined>;
    editRecipe(editedRecipe: Omit<Recipe, 'id'>, editedRecipeId: string): Promise<boolean>;
}
