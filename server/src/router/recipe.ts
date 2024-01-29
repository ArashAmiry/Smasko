import express, { Request, Response } from "express";
import { Recipe } from "../model/recipe";
import { RecipeService } from "../service/recipe";

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
    req: Request<{}, {}, {name : string, imagePath : string, numberServings : number, ingredients : [string, number][], steps : string[]}>,
    res: Response<Recipe | string>
) => {
    try{
        const name: string = req.body.name;
        const imagePath: string = req.body.imagePath;
        const numberServings: number = req.body.numberServings;
        const ingredients: [string, number][]= req.body.ingredients;
        const steps: string[] = req.body.steps;

        if (typeof(name) !== "string"){
            res.status(400).send(`Bad post call to ${req.originalUrl} --- recipe has type ${typeof(name)}`);
            return;
        }
        if (typeof(imagePath) !== "string"){
            res.status(400).send(`Bad post call to ${req.originalUrl} --- recipe has type ${typeof(imagePath)}`);
            return;
        }
        if (typeof(numberServings) !== "number"){
            res.status(400).send(`Bad post call to ${req.originalUrl} --- recipe has type ${typeof(numberServings)}`);
            return;
        }
        if (typeof(ingredients) !== "object"){
            res.status(400).send(`Bad post call to ${req.originalUrl} --- recipe has type ${typeof(ingredients)}`);
            return;
        }
        if (typeof(steps) !== "object"){
            res.status(400).send(`Bad post call to ${req.originalUrl} --- recipe has type ${typeof(steps)}`);
            return;
        }
       
        const newRecipe = await recipeService.addRecipe(name, imagePath, numberServings, ingredients, steps);

        res.status(201).send(newRecipe);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

recipeRouter.delete("/:id", async (
    req: Request<{id : string}, {}, {}>,
    res: Response<string>
) => {
    try {
        if (req.params.id == null) {
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- missing id param`);
            return;
        }
        const deleteId : number = parseInt(req.params.id, 10);
        if (! (deleteId >= 0)) {
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- id number must be a non-negative integer`);
            return;
        }
        const isRecipeDeleted : Boolean = await recipeService.deleteRecipe(deleteId);
        if(isRecipeDeleted) {
            res.sendStatus(204);
        }
    }
    catch (e : any) {
        res.status(500).send(e.message);
    }
});
