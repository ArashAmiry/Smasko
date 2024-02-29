import * as SuperTest from "supertest";
import { app } from "../../src/start";
import { Recipe } from "../../src/model/recipe";

const request = SuperTest.default(app);


afterEach(async () => {
    const recipes = await request.get("/recipe");

    recipes.body.map(async (recipe : Recipe) => {
        await request.delete("/recipe/"+recipe._id)
    });
  });


test("POST and GET valid recipe", async () => {
    const recipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
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
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
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
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
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
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
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
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
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

test("POST and GET valid recipe with ID", async () => {
    const recipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"]
    } 
    const res1 = await request.post("/recipe").send(recipe);

    expect(res1.statusCode).toEqual(201);
    expect(res1.body).toMatchObject(recipe);

    const res2 = await request.get("/recipe/" + res1.body.id);

    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toEqual(res1.body);
})

test("GET recipe with invalid ID", async () => {
    const res = await request.get("/recipe/0");
    expect(res.statusCode).toEqual(400);
})

test ("PUT recipe should edit recipe", async () => {
    const recipe : Omit<Recipe,'id'> = {
        name: "Recipe",
        imagePath: "img",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"]
    } 

    const res1 = await request.post("/recipe").send(recipe);
    const recipe2 : Recipe = res1.body;
    recipe2.name = "Recipe2";
    const res2 = await request.put("/recipe/" + res1.body.id).send(recipe2);
    expect(res2.body).toEqual(recipe2);
    const res3 = await request.get("/recipe/" + res1.body.id);
    expect(res3.body).toEqual(recipe2);

})
