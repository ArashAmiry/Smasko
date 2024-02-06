import { Recipe } from "../model/recipe";
import { RecipeService } from "./recipe";

test("If recipe is added to list then it should be in the list", async () => {
    const recipeService = new RecipeService();
    const testRecipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4, "g"], ["chicken", 6, "g"]],
        steps: ["step1", "step2"]
    } 

    const recipe = await recipeService.addRecipe(testRecipe);
    const recipes = await recipeService.getRecipes();


    expect(recipes.some((r) => r.id === recipe.id)).toBeTruthy();
    expect(recipes.some((r) => r.name === recipe.name)).toBeTruthy();
    expect(recipes.some((r) => r.imagePath === recipe.imagePath)).toBeTruthy();
    expect(recipes.some((r) => r.numberServings === recipe.numberServings)).toBeTruthy();
    expect(recipe.ingredients).toEqual(recipes[0].ingredients);
    expect(recipe.steps).toEqual(recipes[0].steps);
    expect(recipes.length === 1).toBeTruthy();
})

test("If get recipe is called it should return an empty list", async () => {
    const recipeService = new RecipeService();

    const recipes = await recipeService.getRecipes();
    
    expect(recipes.length === 0).toBeTruthy();
})

test("If recipe is deleted from list then it should not be in the list", async () => {
    const recipeService = new RecipeService();
    const testRecipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4, "g"], ["chicken", 6, "g"]],
        steps: ["step1", "step2"]
    } 

    const recipe = await recipeService.addRecipe(testRecipe);
    await recipeService.deleteRecipe(recipe.id);
    const recipes = await recipeService.getRecipes();

    expect(recipes.length === 0).toBeTruthy();
})

test("If recipe ID is deleted from a list that does not contain that ID, then deleteRecipe() should return false", async () => {
    const recipeService = new RecipeService();

    const isDeleted = await recipeService.deleteRecipe(123);

    expect(isDeleted).toBeFalsy();
})

test("If negative recipe ID is deleted from a list then false is returned", async () => {
    const recipeService = new RecipeService();

    const isDeleted = await recipeService.deleteRecipe(-123);

    expect(isDeleted).toBeFalsy();
})


test("If recipe is deleted from list with two recipes then the list should be of length 1 and contain correct recipe", async () => {
    const recipeService = new RecipeService();
    const testRecipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4, "g"], ["chicken", 6, "g"]],
        steps: ["step1", "step2"]
    } 

    const testRecipe2 : Omit<Recipe,'id'> = {
        name: "Recipe2",
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4, "g"], ["chicken", 6, "g"]],
        steps: ["step1", "step2"]
    } 

    const recipe = await recipeService.addRecipe(testRecipe);
    const recipe2 = await recipeService.addRecipe(testRecipe2);
    await recipeService.deleteRecipe(recipe.id);
    const recipes = await recipeService.getRecipes();
    
    expect(recipes).toContainEqual(recipe2);
    expect(recipes.length === 1);
})
