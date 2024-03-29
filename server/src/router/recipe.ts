import express, { Request, Response } from "express";
import { Recipe, validateRecipe } from "../model/recipe";
import { RecipeDBService } from  "../service/dbrecipe";  

const recipeService = new RecipeDBService();

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

recipeRouter.get("/favorites", async (
    req : Request<{}, {}, {}>,
    res : Response<Array<Recipe> | String>
) => {
    try {
        const recipes = await recipeService.getFavoriteRecipes();
        res.status(200).send(recipes);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

recipeRouter.get("/:id", async (
    req : Request<{id : string}, {}, {}>,
    res : Response<Recipe | string>
) => {
    try {
        const recipe = await recipeService.getRecipe(req.params.id);
        if (recipe === undefined) {
            res.status(400).send(`Bad GET call to ${req.originalUrl} --- recipe with id ${req.params.id} does not exist`);
            return;
        }
        res.status(200).send(recipe);
    } catch (e : any) {
        res.status(500).send(e.message);
    }
})

recipeRouter.post("/", async (
    req : Request<{}, {}, Omit<Recipe, '_id'>>,
    res : Response<Recipe | string>
) => {
    try {
        const recipe: Omit<Recipe, '_id'> = req.body;
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
        const deletedRecipe : boolean = await recipeService.deleteRecipe(req.params.id);
       
        if (deletedRecipe === false) {
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- recipe with id ${req.params.id} does not exist`);
            return;
        }
        res.status(204).send();
    } catch (e: any) {
       
        res.status(500).send(e.message);
    }    
});

recipeRouter.put("/:id", async (
    req : Request<{id : string}, {}, Recipe>,
    res : Response<Recipe | string>
) => {
    try {
        const recipe : Recipe = req.body;
        const recipeErrors = validateRecipe(recipe);
        
        if (req.params.id !== recipe._id) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- ID in body does not match ID in path`);
            return;
        }
       
        if (recipeErrors){
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- ${recipeErrors}`);
            return;
        }

        const wasEdited = await recipeService.editRecipe(recipe);
        if(!wasEdited) {
            res.status(400).send('Recipe could not be edited');
        }

        res.status(200).send(recipe);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

recipeRouter.patch("/:id", async (
    req : Request<{id : string}, {}, {liked: boolean}>,
    res : Response<boolean | string>
) => {
    try {
        const liked : boolean = req.body.liked;

        const wasEdited = await recipeService.updateLiked(req.params.id, liked);
        if(!wasEdited) {
            res.status(400).send('Recipe could not be edited');
        }

        res.status(200).send(wasEdited);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})