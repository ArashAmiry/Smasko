import {Schema, Model} from "mongoose";
import { conn } from "./conn";
import { Recipe } from "../src/model/recipe";

const recipeSchema : Schema = new Schema({
    id : {

        type : Number,
       
        required : true,
       
        unique: true
       
        },
       
    name : {
       
        type : String,
       
        required : true
       
        },
       
    image : {
       
        type : String,

        required : false
        },

    numberServings: {
        type: Number,
        required: true
    },

    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            },

            _id: false
        }
    ], 

    steps: {
        type: [String],
        required: true
    }
    
});



export const recipeModel = conn.model<Recipe>("Recipe", recipeSchema);


