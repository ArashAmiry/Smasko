import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import "./createRecipe.css";

import { ChangeEvent, useEffect, useState } from "react";
import IngredientRow from "./IngredientRow";
import StepRow from "./StepsRow";


export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};

function CreateRecipe() {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([{name : "", amount: 0, unit: "st"}]);
    const [stepsList, setStepsList] = useState([{desc: ""}]);

    const addIngredient = () => {
        let newIngredient : Ingredient = {name : "", amount: 0, unit: "st"};
        setIngredientsList([...ingredientsList, newIngredient]);
        //console.log("hej");
    }

    const deleteIngredient = (index : number) => {
        //console.log(index);
        const list = [...ingredientsList];
        list.splice(index, 1);
        setIngredientsList(list);
        //console.log(list);
    }
    const handleChange = (e : ChangeEvent, index : number) => {
        const {name, value} = e.target as HTMLInputElement;
        const list = [...ingredientsList];
       // console.log(name);
        (list[index] as any)[name] = value;
        setIngredientsList(list);
        //console.log(ingredientsList)
    }

    const addStep = () => {
        setStepsList([...stepsList, {desc: ""}]);
        //console.log("hej");
    }

    const deleteStep = (index : number) => {
        //console.log(index);
        const list = [...stepsList];
        list.splice(index, 1);
        setStepsList(list);
        //console.log(list);
    }
    const handleChangeStep = (e : ChangeEvent, index : number) => {
        const {name, value} = e.target as HTMLInputElement;
        const list = [...stepsList];
       // console.log(name);
        (list[index] as any)[name] = value;
        setStepsList(list);
        //console.log(ingredientsList)
    }


    return (
        <Form className="container m-2 mx-auto create-recipe-container">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Recipe Name" />
            </Form.Group>
            <Form.Group className="test">
                <Form.Label> Choose an image for the recipe</Form.Label>
                <Form.Control type="file" lang="en" />
            </Form.Group>

            <Form.Group className="ingredients my-3 px-3">
                <h2>Ingredients</h2>
                <Form.Label>Number of servings</Form.Label>
                <Form.Select defaultValue={4}>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </Form.Select>

                <Container className="p-0">
                {ingredientsList.map((singleIngredient, index) => (
                    <IngredientRow key={index} ingredient={singleIngredient} handleDelete={() => deleteIngredient(index)} handleChange={(e) => handleChange(e, index)} index={index}/>
                ))}
            </Container>
                <Button variant="primary" onClick={addIngredient}>
                    Add new ingredient
                </Button>
            </Form.Group>

            <Form.Group>
                <Container className="p-0">
                {stepsList.map((singleStep, index) => (
                    <StepRow key={index} step={singleStep} handleDelete={() => deleteStep(index)} handleChange={(e) => handleChangeStep(e, index)} index={index}/>
                ))}
            </Container>
                <Button variant="primary" onClick={addStep}>
                    Add new step
                </Button>
            </Form.Group>



            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default CreateRecipe;