import { Recipe } from "../model/recipe";
import { RecipeService } from "./recipe"

test("If a recipe is added to the list then it should be in the list", async () => {
    const testRecipe : Omit<Recipe,'id'> = {
        name: "testRecipe",
        imagePath: "imagePath",
        numberServings: 5,
        ingredients: [["gurka", 1], ["tomat", 2]],
        steps: ["step1", "step2"]
    }
    const recipeService = new RecipeService();
    await recipeService.addRecipe(testRecipe);
    const recipes = await recipeService.getRecipes();
    expect(recipes[0]).toMatchObject(testRecipe);
})