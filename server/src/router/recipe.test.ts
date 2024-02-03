import * as SuperTest from "supertest";
import { app } from "../../src/start";
import { Recipe } from "../../src/model/recipe";

const request = SuperTest.default(app);


afterEach(async () => {
    const recipes = await request.get("/recipe");

    recipes.body.map(async (recipe : Recipe) => {
        await request.delete("/recipe/"+recipe.id)
    });
  });


test("POST and GET valid recipe", async () => {
    const recipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4], ["chicken", 6]],
        steps: ["step1", "step2"]
    } 
    const res1 = await request.post("/recipe").send(recipe);

    expect(res1.statusCode).toEqual(201);
    expect(res1.body).toMatchObject(recipe);

    const res2 = await request.get("/recipe");

    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toContainEqual(res1.body);
})

test("POST and GET invalid recipe", async () => {
    const invalidRecipe = {
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4], ["chicken", 6]],
        steps: ["step1", "step2"]
    } 
    const res1 = await request.post("/recipe").send(invalidRecipe);

    expect(res1.statusCode).toEqual(400);

    const res2 = await request.get("/recipe");

    expect(res2.statusCode).toEqual(200);
    console.log(res2.body);
    expect(res2.body.length === 0).toBeTruthy();
})


test("DELETE and GET valid recipe", async () => {
    const recipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4], ["chicken", 6]],
        steps: ["step1", "step2"]
    } 
    const res1 = await request.post("/recipe").send(recipe);

    const deleteId : string = res1.body.id.toString();
    const res2 = await request.delete("/recipe/"+deleteId);
    expect(res2.statusCode).toEqual(204);

    const res3 = await request.get("/recipe");
    console.log(res3.body);
    expect(res3.statusCode).toEqual(200);
    expect(res3.body.length === 0);
})

test("DELETE and GET invalid text ID", async () => {
    const recipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4], ["chicken", 6]],
        steps: ["step1", "step2"]
    } 
    const res1 = await request.post("/recipe").send(recipe);

    const deleteId : string = res1.body.id.toString();
    const res2 = await request.delete("/recipe/"+ "wrongID");
    expect(res2.statusCode).toEqual(400);

    const res3 = await request.get("/recipe");
    console.log(res3.body);
    expect(res3.statusCode).toEqual(200);
    expect(res3.body.length === 0);
})

test("DELETE and GET invalid negative ID", async () => {
    const recipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [["in1", 4], ["chicken", 6]],
        steps: ["step1", "step2"]
    } 
    const res1 = await request.post("/recipe").send(recipe);

    const deleteId : string = res1.body.id.toString();
    const res2 = await request.delete("/recipe/"+ "-123");
    expect(res2.statusCode).toEqual(400);

    const res3 = await request.get("/recipe");
    console.log(res3.body);
    expect(res3.statusCode).toEqual(200);
    expect(res3.body.length === 0);
})