import "./createRecipe.css";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import IngredientRow from "./IngredientRow";
import StepRow from "./StepsRow";
import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";


export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};

interface IngredientsListProps {
    ingredientsList: Array<Ingredient>; // Assuming Ingredient is another interface or type
    deleteIngredient: (index: number) => void;
    changeName: (name: string, index: number) => void;
    changeAmount: (amount: number, index: number) => void;
    changeUnit: (unit: string, index: number) => void;
}

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
        // console.log(name);
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
        const { value } = e.target as HTMLInputElement;
        setRecipeName(value);
    }

    const changeNumServings = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setNumServings(parseInt(value));
    }

    async function submitRecipe(e: FormEvent) {
        e.preventDefault();
        const response = await axios.post('http://localhost:8080/recipe', {
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

            <Form.Group as={Col} sm className="ingredients justify-content-center mt-3 rounded-4 bg-light shadow-sm p-4">
                <h2>Ingredients</h2>
                <Container className="servings-container col-md-1 mb-3" >
                    <Form.Label>Number of servings</Form.Label>
                    <Form.Select defaultValue={4} onChange={e => changeNumServings(e)}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </Form.Select>
                </Container>

                <Container className="p-0">
                    <IngredientsList
                        ingredientsList={ingredientsList}
                        deleteIngredient={deleteIngredient}
                        changeName={changeName}
                        changeAmount={changeAmount}
                        changeUnit={changeUnit}
                    />
                </Container>
                <Button variant="outline-secondary" className="btn-outline-secondary mt-3" onClick={addIngredient}>
                    Add new ingredient
                </Button>
            </Form.Group>

            <Form.Group as={Col} sm className="ingredients justify-content-center mt-3 rounded-4 bg-light shadow-sm p-4">
                <Container className="p-0">
                    {stepsList.map((singleStep, index) => (
                        <StepRow
                            key={index}
                            step={singleStep}
                            handleDelete={() => deleteStep(index)}
                            handleChange={(e) => handleChangeStep(e, index)}
                            index={index}
                        />
                    ))}
                </Container>
                <Button variant="outline-secondary" className="btn-outline-secondary my-3" onClick={addStep}>
                    Add new step
                </Button>
            </Form.Group>



            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

function IngredientsList({ ingredientsList, deleteIngredient, changeName, changeAmount, changeUnit }: IngredientsListProps) {
    return (
        <>
            {ingredientsList.map((singleIngredient, index) => (
                <IngredientRow
                    key={index}
                    ingredient={singleIngredient}
                    handleDelete={() => deleteIngredient(index)}
                    changeName={(name) => changeName(name, index)}
                    changeAmount={(amount) => changeAmount(amount, index)}
                    changeUnit={(unit) => changeUnit(unit, index)}
                    index={index}
                />
            ))}
        </>
    );
}

export default CreateRecipe;
