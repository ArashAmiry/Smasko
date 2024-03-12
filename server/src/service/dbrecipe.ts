import { Model } from "mongoose";
import { recipeModel } from "../../db/recipe.db";
import { Recipe } from "../model/recipe";
import { IRecipeService } from "./IRecipe";

export class RecipeDBService implements IRecipeService {
    async getRecipes(): Promise<Recipe[]> {
        try {
            const rm: Model<Recipe> = await recipeModel;
            const recipes = await rm.find();
            console.log(recipes)
            return recipes;
        } catch (error) {
            console.error("Error fetching recipes:", error);
            throw error;
        }
    }

    async getFavoriteRecipes(): Promise<Recipe[]> {
        try {
            const rm: Model<Recipe> = await recipeModel;
            const recipes = await rm.find({ like: true });
            return recipes;
        } catch (error) {
            console.error("Error fetching recipes:", error);
            throw error;
        }
    }

    async addRecipe(recipe: Omit<Recipe, "_id">): Promise<Recipe> {
        const rm: Model<Recipe> = await recipeModel;
        return await rm.create({
            name: recipe.name,
            image: recipe.image,
            numberServings: recipe.numberServings,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            rating: recipe.rating
        })
    }
    async deleteRecipe(id: string): Promise<boolean> {
        const rm: Model<Recipe> = await recipeModel;
        const result = await rm.deleteOne({ _id: id }).exec();
        return (result.deletedCount !== 0);
    }
    async getRecipe(recipeId: string): Promise<Recipe | undefined> {
        const rm: Model<Recipe> = await recipeModel;
        const recipe = await rm.findOne({ _id: recipeId }).exec();
        return recipe ? recipe.toObject() : undefined;
    }
    async editRecipe(editedRecipe: Recipe): Promise<boolean> {
        const rm: Model<Recipe> = await recipeModel;
        const result = await rm.findOneAndUpdate(
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
        const rm: Model<Recipe> = await recipeModel;
        const result = await rm.updateOne(
            { _id: recipeId },
            {
                like: like
            },
            { new: true }
        ).exec();
            
        return result.matchedCount > 0;
    }
}