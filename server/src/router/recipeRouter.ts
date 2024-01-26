import express, { Request, Response } from "express";
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipeService";

const recipeService = new RecipeService();

export const recipeRouter = express.Router();

recipeRouter.get("/", async (
    req : Request<{}>,
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
    try{
        const recipe: Recipe = req.body;

        if (typeof(recipe) !== "object" || recipe !instanceof Recipe){

        }
    }
})
