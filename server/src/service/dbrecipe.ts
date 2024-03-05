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

    async getFavoriteRecipes(): Promise<Recipe[]> {
        try {
            const recipes = await recipeModel.find({like: true});
            return recipes; 
        } catch (error) {
            console.error("Error fetching recipes:", error);
            throw error;
        }
    }

    async addRecipe(recipe: Omit<Recipe, "_id">): Promise<Recipe> {

        console.log(recipe);
       return await recipeModel.create({
        name: recipe.name,
        image: recipe.image,
        numberServings: recipe.numberServings,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        rating: recipe.rating
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
                steps: editedRecipe.steps,
                rating: editedRecipe.rating,
                like: editedRecipe.like
            },
            { new: true }
        ).exec();

        return result !== null;
    }

    async updateLiked(recipeId: string, like: boolean): Promise<boolean> {
       const result = await recipeModel.updateOne(
            { _id: recipeId},
            {
                like: like
            },
            { new: true }
        ).exec();

        return result !== null;
    }
}