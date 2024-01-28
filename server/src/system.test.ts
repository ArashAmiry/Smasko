import * as SuperTest from "supertest";
import { app } from "./start";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const testRecipe = {
        name: "testRecipe",
        imagePath: "imagePath",
        numberServings: 5,
        ingredients: [],
        steps: []
    }
    const res1 = await request.post("/recipe").send({name: testRecipe.name, imagePath:
    testRecipe.imagePath, numberServings: testRecipe.numberServings, ingredients: testRecipe.ingredients, steps: testRecipe.steps});
    expect(res1.statusCode).toEqual(201);

    for (const [key, value] of Object.entries(testRecipe)) {
        expect(res1.body[key]).toEqual(value);
    }

    const res2 = await request.get("/recipe");
    expect(res2.statusCode).toEqual(200);
    for (const [key, value] of Object.entries(testRecipe)) {
        expect(res2.body[0][key]).toEqual(value);
    } 
});