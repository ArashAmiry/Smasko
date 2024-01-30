import { Recipe } from '../model/recipe';

export class RecipeService {
    private recipes : Recipe[] = [];

    async getRecipes(): Promise<Recipe[]> {
        return JSON.parse(JSON.stringify(this.recipes));
    }

    async addRecipe(name : string, imagePath : string, numberServings : number, ingredients : [string, number][], steps : string[]) : Promise<Recipe>{
        
        const recipe: Recipe = {
            id: Date.now(),
            name: name,
            imagePath: imagePath,
            numberServings: numberServings,
            ingredients: ingredients,
            steps: steps
        }

        this.recipes.push(recipe);
        
        return {...recipe};
    }

    async deleteRecipe(id: number) : Promise<Boolean> {
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
}