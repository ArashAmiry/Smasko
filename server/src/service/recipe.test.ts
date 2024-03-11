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

test("If a recipe is created then it should be in the list of recipes", async () => {

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

test("If recipe is deleted then it should not be in the list of recipes", async () => {
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

test("If get recipe is called when no recipes are created, it should return an empty list", async () => {

    const recipes = await recipeService.getRecipes();
    expect(recipes.length === 0).toBeTruthy();
})



test("If recipe ID is called to be deleted from a list that does not contain that ID, then deleteRecipe() should return false", async () => {

    const recipeId = "60eac581c329232b14c29d32";

    // Call the deleteRecipe method with the valid ObjectId
    const isDeleted = await recipeService.deleteRecipe(recipeId);
    expect(isDeleted).toBeFalsy()
})


test("If recipe is deleted from a list with two recipes then the list should be of length 1 and contain correct recipe", async () => {
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

test("If recipe is updated with true for 'like' it will now be in the list of favorites", async () => {
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
    const favoriteList = await recipeService.getFavoriteRecipes();
    expect(favoriteList.length === 0).toBeTruthy();

    await recipeService.updateLiked(recipe._id, true);
    const favoriteList1 = await recipeService.getFavoriteRecipes();
    expect(favoriteList1.length === 1).toBeTruthy();
})

test("editRecipe should return true if recipe is successfully edited when called", async () => {
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
    expect(recipe.rating === 4).toBeTruthy();
    const newRecipe: Recipe = {
        _id: recipe._id,
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 2,
        like: false
    }
    const res = await recipeService.editRecipe(newRecipe);
    const recipe2 = await recipeService.getRecipe(recipe._id);
    if (recipe2) {
        expect(recipe2.rating === 2).toBeTruthy();
        expect(res).toBeTruthy();
    }

})

test("getRecipe with invalid id should return undefined", async () => {
    const testRecipe: Omit<Recipe, '_id'> = {
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    }
    await recipeService.addRecipe(testRecipe);
    const res = await recipeService.getRecipe("65eec198e3a5ac94eb5f6368"); // Invalid ObjectID
    expect(res).toBeUndefined();

})

test("editRecipe with invalid id should return false", async () => {
    const testRecipe: Omit<Recipe, '_id'> = {
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    }
    await recipeService.addRecipe(testRecipe);
    const newRecipe: Recipe = {
        _id: "65eec198e3a5ac94eb5f6368", // Invalid ObjectID, does not match initial recipe's ID
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 2,
        like: false
    }
    const res = await recipeService.editRecipe(newRecipe);
    expect(res).toBeFalsy();
})

test("updateLiked with invalid id should return false", async () => {
    const testRecipe: Omit<Recipe, '_id'> = {
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    }
    await recipeService.addRecipe(testRecipe);

    const res = await recipeService.updateLiked("65eec198e3a5ac94eb5f6368", true);
    expect(res).toBeFalsy();
})

test("deleteRecipe with invalid id should return false", async () => {
    const testRecipe: Omit<Recipe, '_id'> = {
        name: "Recipe",
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    }
    await recipeService.addRecipe(testRecipe);
    const res = await recipeService.deleteRecipe("65eec198e3a5ac94eb5f6368"); // Invalid ObjectID
    expect(res).toBeFalsy();

})
