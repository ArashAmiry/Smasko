import { recipeModel } from "../../db/recipe.db";
import { Recipe } from "../model/recipe";
import { IRecipeService } from "./IRecipe";

export class RecipeDBService implements IRecipeService {
    async getRecipes(): Promise<Recipe[]> {
        try {
            const recipes = await recipeModel.find();
            return recipes; 
        } catch (error) {
            console.error("Error fetching recipes:", error);
            throw error;
        }
    }
    async addRecipe(recipe: Omit<Recipe, "id">): Promise<Recipe> {
       return await recipeModel.create({
        id: new Date().valueOf(),
        name: recipe.name,
        image: recipe.image,
        numberServings: recipe.numberServings,
        ingredients: recipe.ingredients,
        steps: recipe.steps
       }) 
    }
    async deleteRecipe(id: number): Promise<boolean> {
        const result = await recipeModel.deleteOne({ id: id }).exec();
        return (result.deletedCount !== 0);
    }
    async getRecipe(recipeId: number): Promise<Recipe | undefined> {
        const recipe = await recipeModel.findOne({ id: recipeId }).exec();
        console.log(recipe)
        return recipe ? recipe.toObject() : undefined;
    }
    async editRecipe(editedRecipe: Omit<Recipe, "id">, editedRecipeId: number): Promise<boolean> {
        const result = await recipeModel.findOneAndUpdate(
            { id: editedRecipeId },
            {
                name: editedRecipe.name,
                image: editedRecipe.image,
                numberServings: editedRecipe.numberServings,
                ingredients: editedRecipe.ingredients,
                steps: editedRecipe.steps
            },
            { new: true }
        ).exec();

        return result !== null;
    }
    
}