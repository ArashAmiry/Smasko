import express, { Request, Response } from "express";
import { Recipe, validateRecipe } from "../model/recipe";
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

recipeRouter.get("/:id", async (
    req: Request<{id : string}, {}, {}>,
    res: Response<Recipe | String>
) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const recipe = await recipeService.getRecipe(id);
        res.status(200).send(recipe)
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

recipeRouter.post("/", async (
    req: Request<{}, {}, Omit<Recipe, 'id'>>,
    res: Response<Recipe | string>
) => {
    try {
        const recipe: Omit<Recipe, 'id'> = req.body;
        const recipeErrors = validateRecipe(recipe);
       
        if (recipeErrors){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- ${recipeErrors}`);
            return;
        }
        const newRecipe = await recipeService.addRecipe(recipe);
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
        const deletedRecipe : boolean = await recipeService.deleteRecipe(id);
       
        if (deletedRecipe === false) {
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- recipe with id ${id} does not exist`);
            return;
        }
        res.status(204).send();
    } catch (e: any) {
        res.status(500).send(e.message);
    }    
});
