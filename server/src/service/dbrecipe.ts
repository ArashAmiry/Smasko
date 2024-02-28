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
        name: recipe.name,
        image: recipe.image,
        numberServings: recipe.numberServings,
        ingredients: recipe.ingredients,
        steps: recipe.steps
       }) 
    }
    async deleteRecipe(id: string): Promise<boolean> {
        const result = await recipeModel.deleteOne({ _id: id }).exec();
        return (result.deletedCount !== 0);
    }
    async getRecipe(recipeId: string): Promise<Recipe | undefined> {
        console.log(recipeId);
        const recipe = await recipeModel.findOne({ _id: recipeId }).exec();
        return recipe ? recipe.toObject() : undefined;
    }
    async editRecipe(editedRecipe: Recipe): Promise<boolean> {
        const result = await recipeModel.findOneAndUpdate(
            { _id: editedRecipe._id },
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