import { Recipe } from '../model/recipe';
import { IRecipeService } from './IRecipe';

export class RecipeService implements IRecipeService {
    private recipes : Recipe[] = [];

    async getRecipes(): Promise<Recipe[]> {
        return JSON.parse(JSON.stringify(this.recipes));
    }
    
    async addRecipe(recipe : Omit<Recipe,'id'>) : Promise<Recipe>{
        
        const addedRecipe: Recipe = {
            _id: Date.now().toString(),
            name: recipe.name,
            image: recipe.image,
            numberServings: recipe.numberServings,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            rating: recipe.rating,
            like: false
        }

        this.recipes.push(addedRecipe);
        return JSON.parse(JSON.stringify(addedRecipe));
    }

    async deleteRecipe(id: string): Promise<boolean> {
        const recipe = this.recipes.find((recipe) => recipe._id === id);
        
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

    async getRecipe(recipeId: string): Promise<Recipe | undefined> {
        const recipe = this.recipes.find((r) => r._id === recipeId);
        if (recipe) {
            return JSON.parse(JSON.stringify(recipe));
        } else {
            return undefined;
        }
    }

    async editRecipe(editedRecipe : Recipe): Promise<boolean> {
        const recipe = this.recipes.find((recipe) => recipe._id === editedRecipe._id);

        if (!recipe) {
            return false;
        }
 
        let recipeIndex : number = this.recipes.indexOf(recipe);
        this.recipes[recipeIndex] = editedRecipe;

        return true;
    }
}