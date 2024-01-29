import express from "express";
import { recipeRouter } from "./router/recipe";

export const app = express();

app.use(express.json());
app.use("/recipe", recipeRouter);