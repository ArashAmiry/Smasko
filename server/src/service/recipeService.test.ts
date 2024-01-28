import { RecipeService } from "./recipe"

test("If a recipe is added to the list then it should be in the list", async () => {
    const testRecipe = {
        name: "testRecipe",
        imagePath: "imagePath",
        numberServings: 5,
        ingredients: [],
        steps: []
    }
    const recipeService = new RecipeService();
    await recipeService.addRecipe(testRecipe.name, testRecipe.imagePath, testRecipe.numberServings, testRecipe.ingredients, testRecipe.steps);
    const recipes = await recipeService.getRecipes();
    expect(recipes.some((recipe) => recipe.name === testRecipe.name)).toBeTruthy();
})