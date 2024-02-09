import "./createRecipe.css";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import IngredientRow from "./IngredientRow";
import StepRow from "./StepsRow";
import React from "react";
import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";


export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};

function CreateRecipe() {
    const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([{name : "", amount: 0, unit: "st"}]);
    const [stepsList, setStepsList] = useState([{desc: ""}]);
    const [formData, setFormData] = useState({recipeName: "", numServings: 4});


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
    const changeName = (name : string, index : number) => {
        const list = [...ingredientsList];
       // console.log(name);
        list[index].name = name;
        setIngredientsList(list);
    }
    const changeAmount = (amount : number, index : number) => {
        const list = [...ingredientsList];
       // console.log(name);
        list[index].amount = amount;
        setIngredientsList(list);
    }
    const changeUnit = (unit : string, index : number) => {
        const list = [...ingredientsList];
       // console.log(name);
        list[index].unit = unit;
        setIngredientsList(list);
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

    const handleFormDataChange = (e : ChangeEvent) => {
         const { name, value } = e.target as HTMLInputElement;
         setFormData(prevFormData => ({...prevFormData,[name]: value}));
    }

    async function submitRecipe(e : FormEvent)  {
        const recipeName : string = formData.recipeName;
        const numServings : number = formData.numServings;
            const response = await axios.post('https://localhost:8080/recipe', {
            "name": recipeName,
            "imagePath": "hej",
            "numberServings": numServings,
            "ingredients": ingredientsList.map(({name, amount, unit}) => [name, amount, unit]),
            "steps": stepsList
          }, {timeout: 10000})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });     
    }

    





    return (
        <Form className="container m-2 mx-auto create-recipe-container" onSubmit={e => submitRecipe(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Recipe Name" name="recipeName" onChange={e => handleFormDataChange(e)}/>
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
                    <IngredientRow key={index} ingredient={singleIngredient} handleDelete={() => deleteIngredient(index)} changeName = {(name) => changeName(name, index)}
                    changeAmount = {(amount : number) => changeAmount(amount, index)} changeUnit = {(unit : string) => changeUnit(unit, index)} index={index}/>
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
