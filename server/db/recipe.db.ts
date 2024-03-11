import {Schema, Model} from "mongoose";
import { conn } from "./conn";
import { Recipe } from "../src/model/recipe";

const recipeSchema : Schema = new Schema({
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
    },
    
    rating: {

        type: Number,

        required: true,

        min: 1,

        max: 5
    },

    like: {
        type: Boolean,
        
        required: true,

        default: false
    }
});


async function makeModel(): Promise<Model<Recipe>> {
return (await conn).model<Recipe>("Recipe", recipeSchema);
}

export const recipeModel: Promise<Model<Recipe>> = makeModel();