import { Recipe } from '../model/recipe';

export interface IRecipeService {
    getRecipes(): Promise<Recipe[]>;
    addRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe>;
    deleteRecipe(id: number): Promise<boolean>;
    getRecipe(recipeId: number): Promise<Recipe | undefined>;
    editRecipe(editedRecipe: Omit<Recipe, 'id'>, editedRecipeId: number): Promise<boolean>;
}
