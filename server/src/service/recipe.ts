import { Recipe } from '../model/recipe';

export class RecipeService {
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
}