import * as SuperTest from "supertest";
import { app } from "../../src/start";
import { Recipe } from "../../src/model/recipe";


jest.mock("../../db/conn");
const request = SuperTest.default(app);

afterEach(async () => {
    const recipes = await request.get("/recipe");

    recipes.body.map(async (recipe: Recipe) => {
        await request.delete("/recipe/" + recipe._id)
    });
});

test("POST and GET invalid recipe", async () => {
    const invalidRecipe = {
        image: "img",
        numberServings: 4,
        ingredients: [{ "name": "in1", "amount": 4, "unit": "g" }, { "name": "chicken", "amount": 6, "unit": "g" }],
        steps: ["step1", "step2"]
    }
    const res1 = await request.post("/recipe").send(invalidRecipe);
    
    expect(res1.statusCode).toEqual(400);

    const res2 = await request.get("/recipe");
    expect(res2.statusCode).toEqual(200);

    expect(res2.body.length === 0).toBeTruthy();
})

test("POST and GET valid recipe", async () => {
    const recipe : Omit<Recipe,'_id' | 'image'> = {
        name: "Recipe",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    } 
    const res1 = await request.post("/recipe").send(recipe);

    expect(res1.statusCode).toEqual(201);
    expect(res1.body).toMatchObject(recipe);

    const res2 = await request.get("/recipe");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toContainEqual(res1.body);
})

test("DELETE and GET valid recipe", async () => {
    const recipe : Omit<Recipe,'_id' | 'image'> = {
        name: "Recipe",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    } 
    const res1 = await request.post("/recipe").send(recipe);

    const deleteId = (res1.body._id);
    const res2 = await request.delete("/recipe/"+deleteId);
    expect(res2.statusCode).toEqual(204);

    const res3 = await request.get("/recipe");

    expect(res3.statusCode).toEqual(200);
    expect(res3.body.length === 0).toBeTruthy();
})

test("DELETE and GET invalid ID", async () => {
    const recipe : Omit<Recipe,'_id' | 'image'> = {
        name: "Recipe",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    } 
    const res1 = await request.post("/recipe").send(recipe);

    const deleteId : string = "65eb12bb558281d500f120a6"; //random ObjectID that is wrong
    const res2 = await request.delete("/recipe/"+ deleteId);
    expect(res2.statusCode).toEqual(400);

    const res3 = await request.get("/recipe");

    expect(res3.statusCode).toEqual(200);
    expect(res3.body.length === 1).toBeTruthy();
})

test("POST and GET valid recipe with ID", async () => {
    const recipe : Omit<Recipe,'_id' | 'image'> = {
        name: "Recipe",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    } 
    const res1 = await request.post("/recipe").send(recipe);

    expect(res1.statusCode).toEqual(201);
    expect(res1.body).toMatchObject(recipe);
    const res2 = await request.get("/recipe/" + res1.body._id);

    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toEqual(res1.body);
})

test("GET recipe with invalid ID", async () => {
    const deleteId : string = "65eb12bb558281d500f120a6"; //random ObjectID that is wrong
    const res = await request.get("/recipe/" + deleteId);
    expect(res.statusCode).toEqual(400);
})

test ("PUT recipe should edit recipe", async () => {
    const recipe : Omit<Recipe,'_id' | 'image'> = {
        name: "Recipe",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    } 

    const res1 = await request.post("/recipe").send(recipe);
    const recipe2 : Recipe = res1.body;
    
    recipe2.name = "Recipe2";
    const res2 = await request.put("/recipe/" + res1.body._id).send(recipe2);
    expect(res2.body).toEqual(recipe2);
    const res3 = await request.get("/recipe/" + res1.body._id);
    expect(res3.body).toEqual(recipe2);

})

test ("Recipe with like: true should be in GET favorites", async () => {
    const recipe : Omit<Recipe,'_id' | 'image'> = {
        name: "Recipe",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    } 
    const recipe2 : Omit<Recipe,'_id' | 'image'> = {
        name: "Recipe",
        numberServings: 4,
        ingredients: [{"name" : "in1", "amount": 4, "unit": "g"}, {"name": "chicken", "amount": 6, "unit" : "g"}],
        steps: ["step1", "step2"],
        rating: 4,
        like: false
    } 

    const r1 = await request.post("/recipe").send(recipe);
    const r2 = await request.post("/recipe").send(recipe2);
    
    const res1 = await request.get("/recipe");
    expect(res1.body.length === 2).toBeTruthy();

    const res2 = await request.get("/recipe/favorites")
    expect(res2.body.length === 0).toBeTruthy();

    const res = await request.patch("/recipe/" + r1.body._id).send({liked: true})
    const res3 = await request.get("/recipe/favorites")
    expect(res3.body.length === 1).toBeTruthy();


})