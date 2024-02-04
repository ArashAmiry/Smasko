import express from "express";
import { recipeRouter } from "./router/recipe";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/recipe", recipeRouter);