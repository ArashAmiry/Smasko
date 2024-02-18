import { Recipe } from '../model/recipe';
import { IRecipeService } from './IRecipe';

export class RecipeService implements IRecipeService {
    private recipes : Recipe[] = [];

    async getRecipes(): Promise<Recipe[]> {
        return JSON.parse(JSON.stringify(this.recipes));
    }
    
    async addRecipe(recipe : Omit<Recipe,'id'>) : Promise<Recipe>{
        
        const addedRecipe: Recipe = {
            id: Date.now(),
            name: recipe.name,
            imagePath: recipe.imagePath,
            numberServings: recipe.numberServings,
            ingredients: recipe.ingredients,
            steps: recipe.steps
        }

        this.recipes.push(addedRecipe);
        return JSON.parse(JSON.stringify(addedRecipe));
    }

    async deleteRecipe(id: number): Promise<boolean> {
        const recipe = this.recipes.find((recipe) => recipe.id === id);
        
        if (!recipe) {
            return false;
        }

        let recipeIndex : number = this.recipes.indexOf(recipe);

        if (recipeIndex > -1) {
            this.recipes.splice(recipeIndex, 1);
            return true;
        }
        return false;
    }

    async getRecipe(recipeId: number): Promise<Recipe | undefined> {
        const recipe = this.recipes.find((r) => r.id === recipeId);
        if (recipe) {
            return JSON.parse(JSON.stringify(recipe));
        } else {
            return undefined;
        }
    }

    async editRecipe(editedRecipe : Omit<Recipe, 'id'>, editedRecipeId : number): Promise<boolean> {
        const recipe = this.recipes.find((recipe) => recipe.id === editedRecipeId);

        if (!recipe) {
            return false;
        }
 
        let recipeIndex : number = this.recipes.indexOf(recipe);

        recipe.imagePath = editedRecipe.imagePath;
        recipe.ingredients = editedRecipe.ingredients;
        recipe.name = editedRecipe.name;
        recipe.numberServings = editedRecipe.numberServings;
        recipe.steps = editedRecipe.steps;

        this.recipes[recipeIndex] = recipe;

        return true;
    }
}