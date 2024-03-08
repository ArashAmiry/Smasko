import { Recipe } from "../model/recipe";
import { RecipeDBService } from "./dbrecipe";
import { RecipeService } from "./recipe";

jest.mock("../../db/conn");

const recipeService = new RecipeDBService();
afterEach(async () => {
    const recipes = await recipeService.getRecipes();
    recipes.map(async (recipe: Recipe) => {
        await recipeService.deleteRecipe(recipe._id)
    });
});

test("If recipe is added to list then it should be in the list", async () => {

    const testRecipe: Omit<Recipe, "_id"> = {
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    }
    const recipe = await recipeService.addRecipe(testRecipe);
    const recipes = await recipeService.getRecipes();

    expect(recipes.some((r) => r._id.toString === recipe._id.toString)).toBeTruthy();
    expect(recipes.some((r) => r.name === recipe.name)).toBeTruthy();
    expect(recipes.some((r) => r.image === recipe.image)).toBeTruthy();
    expect(recipes.some((r) => r.numberServings === recipe.numberServings)).toBeTruthy();
    expect(JSON.stringify(recipe.ingredients)).toEqual(JSON.stringify(recipes[0].ingredients));
    expect(recipe.steps).toEqual(recipes[0].steps);
    expect(recipes.length === 1).toBeTruthy();
})

test("If recipe is deleted from list then it should not be in the list", async () => {
    const testRecipe: Omit<Recipe, '_id'> = {
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    }

    const recipe = await recipeService.addRecipe(testRecipe);
    await recipeService.deleteRecipe(recipe._id);
    const recipes = await recipeService.getRecipes();

    expect(recipes.length === 0).toBeTruthy();
})

test("If get recipe is called it should return an empty list", async () => {

    const recipes = await recipeService.getRecipes();
    expect(recipes.length === 0).toBeTruthy();
})



test("If recipe ID is deleted from a list that does not contain that ID, then deleteRecipe() should return false", async () => {

    const recipeId = "60eac581c329232b14c29d32";

    // Call the deleteRecipe method with the valid ObjectId
    const isDeleted = await recipeService.deleteRecipe(recipeId);
    expect(isDeleted).toBeFalsy()
})


test("If recipe is deleted from list with two recipes then the list should be of length 1 and contain correct recipe", async () => {
    const testRecipe: Omit<Recipe, '_id'> = {
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    }

    const testRecipe2: Omit<Recipe, '_id'> = {
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    }

    const recipe = await recipeService.addRecipe(testRecipe);
    await recipeService.addRecipe(testRecipe2);
    await recipeService.deleteRecipe(recipe._id);
    const recipes = await recipeService.getRecipes();

    expect(recipes.length === 1).toBeTruthy();
})
