import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import IngredientRow from "./components/Recipe/IngredientRow";
import StepRow from "./components/Recipe/StepsRow";
import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import RecipeSteps from "./components/Recipe/RecipeSteps";
import IngredientsList from "./components/Recipe/IngredientsList";
import RecipeIngredients from "./components/Recipe/RecipeIngredients";
import "./createRecipe.css";

export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};


function CreateRecipe() {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([{ name: "", amount: 0, unit: "st" }]);
    const [stepsList, setStepsList] = useState<string[]>([""]);
    const [recipeName, setRecipeName] = useState("");
    const [imgPath, setImgPath] = useState("");
    const [numServings, setNumServings] = useState(4);

    const addIngredient = () => {
        let newIngredient: Ingredient = { name: "", amount: 0, unit: "st" };
        setIngredientsList([...ingredientsList, newIngredient]);
        //console.log("hej");
    }

    const deleteIngredient = (index: number) => {
        //console.log(index);
        const list = [...ingredientsList];
        list.splice(index, 1);
        setIngredientsList(list);
        //console.log(list);
    }
    const changeName = (name: string, index: number) => {
        const list = [...ingredientsList];
        // console.log(name);
        list[index].name = name;
        setIngredientsList(list);
    }
    const changeAmount = (amount: number, index: number) => {
        const list = [...ingredientsList];
        list[index].amount = amount;
        setIngredientsList(list);
    }
    
    const changeUnit = (unit: string, index: number) => {
        const list = [...ingredientsList];
        // console.log(name);
        list[index].unit = unit;
        setIngredientsList(list);
    }

    const addStep = () => {
        setStepsList([...stepsList, ""]);
        //console.log("hej");
    }

    const deleteStep = (index: number) => {
        //console.log(index);
        const list = [...stepsList];
        list.splice(index, 1);
        setStepsList(list);
        //console.log(list);
    }

    const handleChangeStep = (e: ChangeEvent, index: number) => {
        const { value } = e.target as HTMLInputElement;
        const list = [...stepsList];
        // console.log(name);
        list[index] = value;
        setStepsList(list);
        //console.log(ingredientsList)
    }

    const changeRecipeName = (e: ChangeEvent) => {
        let { value } = e.target as HTMLInputElement;

        setRecipeName(value);
    }

    const changeNumServings = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setNumServings(parseInt(value));
    }

    async function submitRecipe(e: FormEvent) {
        console.log("submit");
        e.preventDefault();
        await axios.post('http://localhost:8080/recipe', {
            "name": recipeName,
            "imagePath": "hej",
            "numberServings": numServings,
            "ingredients": ingredientsList,
            "steps": stepsList
        }, { timeout: 10000 })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        window.location.reload();
    }

    return (
        <Form className="container m-2 mx-auto create-recipe-container" onSubmit={e => submitRecipe(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
                    className="recipe-name mx-auto mt-3"
                    type="text"
                    placeholder="Recipe Name"
                    name="recipeName"
                    required
                    maxLength={20}
                    onChange={e => changeRecipeName(e)} />
            </Form.Group>

            <Form.Group className="image-input my-3 p-4">
                <Form.Label> Choose an image for the recipe</Form.Label>
                <Form.Control type="file" lang="en" />
            </Form.Group>

            <RecipeIngredients
                ingredientsList={ingredientsList}
                deleteIngredient={(index) => deleteIngredient(index)}
                changeName={(name, index) => changeName(name, index)}
                changeAmount={(amount, index) => changeAmount(amount, index)}
                changeUnit={(unit, index) => changeUnit(unit, index)}
                changeNumServings={(e) => changeNumServings(e)}
                addIngredient={() => addIngredient()}
            />

            <RecipeSteps
                stepsList={stepsList}
                deleteStep={(index) => deleteStep(index)}
                addStep={() => addStep()}
                handleChangeStep={(e, index) => handleChangeStep(e, index)}
            />


<Button variant="success" type="submit" className="submit-button" size="lg">
                Submit
            </Button>
        </Form>
    );
}


export default CreateRecipe;
