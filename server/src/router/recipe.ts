import express, { Request, Response } from "express";
import { Recipe, isRecipe } from "../model/recipe";
import { RecipeService } from "../service/recipe";

const recipeService = new RecipeService();

export const recipeRouter = express.Router();

recipeRouter.get("/", async (
    req : Request<{}, {}, {}>,
    res : Response<Array<Recipe> | String>
) => {
    try {
        const recipes = await recipeService.getRecipes();
        res.status(200).send(recipes);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

recipeRouter.post("/", async (
    req: Request<{}, {}, Recipe>,
    res: Response<Recipe | string>
) => {
    try {
        const recipe: Recipe = req.body;

        if (typeof(recipe) !== "object" || !isRecipe(recipe)){
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- object does not have type recipe`);
            return;
        }
        const newRecipe = await recipeService.addRecipe(recipe.name, recipe.imagePath, recipe.numberServings, recipe.ingredients, recipe.steps);
        res.status(201).send(newRecipe);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

recipeRouter.delete("/:id", async (
    req : Request<{id : string}, {}, {}>,
    res : Response<Recipe | string>
) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const deletedRecipe = await recipeService.deleteRecipe(id);
       
        if (deletedRecipe === undefined) {
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- recipe with id ${id} does not exist`);
            return;
        }
        res.status(201).send(deletedRecipe);
    } catch (e: any) {
        res.status(500).send(e.message);
    }    
});