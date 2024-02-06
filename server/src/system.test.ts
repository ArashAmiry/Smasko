import * as SuperTest from "supertest";
import { app } from "./start";
import { Recipe } from "./model/recipe";

const request = SuperTest.default(app);

test("POST and GET test", async () => {

    const testRecipe : Omit<Recipe, 'id'> = {
        name: "testRecipe",
        imagePath: "imagePath",
        numberServings: 5,
        ingredients: [["gurka", 1], ["tomat", 2]],
        steps: ["step1", "step2"]
    }
    const res1 = await request.post("/recipe").send(testRecipe);
    expect(res1.statusCode).toEqual(201);
    expect(res1.body).toMatchObject(testRecipe);

    const res2 = await request.get("/recipe");
    expect(res2.statusCode).toEqual(200);
    expect(res1.body).toEqual(res2.body[0]);
});

test("Invalid recipe should return status code 400", async () => {
    const res = await request.post("/recipe").send();
    expect(res.statusCode).toEqual(400);
})