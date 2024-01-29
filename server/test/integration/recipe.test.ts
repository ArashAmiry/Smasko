import * as SuperTest from "supertest";
import { app } from "../../src/start";
import { Recipe } from "../../src/model/recipe";

const request = SuperTest.default(app);

test("POST and GET test", async () => {
    const res1 = await request.post("/recipe").send({
        "name": "Recipe",
        "imagePath": "img",
        "numberServings": 4,
        "ingredients": [["in1", 4], ["armar", 6]],
        "steps": ["step1", "step2"]
    });
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.id !== null);
    expect(res1.body.name).toEqual("Recipe");
    expect(res1.body.imagePath).toEqual("img");
    expect(res1.body.numberServings).toEqual(4);
    expect(res1.body.ingredients).toEqual([["in1", 4], ["armar", 6]]);
    expect(res1.body.steps).toEqual(["step1", "step2"]);

    const res2 = await request.get("/recipe");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toContainEqual(res1.body);
})

test("DELETE and GET test", async () => {
    const res1 = await request.post("/recipe").send({
        "name": "Recipe",
        "imagePath": "img",
        "numberServings": 4,
        "ingredients": [["in1", 4], ["armar", 6]],
        "steps": ["step1", "step2"]
    });
    const deleteId : string = res1.body.id.toString();
    const res2 = await request.delete("/recipe/"+deleteId);
    expect(res2.statusCode).toEqual(204);

    const res3 = await request.get("/recipe");
    expect(res3.statusCode).toEqual(200);
    expect(res3.body.length === 0);
})